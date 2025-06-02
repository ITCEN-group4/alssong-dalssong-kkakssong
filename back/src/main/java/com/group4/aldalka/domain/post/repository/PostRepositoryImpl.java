package com.group4.aldalka.domain.post.repository;

import com.group4.aldalka.domain.post.dto.PostResponse;
import com.group4.aldalka.domain.post.dto.PostSearchRequest;
import com.group4.aldalka.domain.post.entity.*;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class PostRepositoryImpl implements PostRepositoryCustom{


    private final JPAQueryFactory queryFactory;
    private final BaseLiquorRepository baseLiquorRepository;
    private final IngredientReposiroty ingredientReposiroty;

    @Override
    public List<PostResponse> getFilteredPosts(String userId, PostSearchRequest request) {
        QPost post = QPost.post;

        BooleanBuilder builder = new BooleanBuilder();

        if (request.getIsOfficial() != null) {
            builder.and(post.isOfficial.eq(request.getIsOfficial()));
        }

        if (request.getDifficulty() != null) {
            builder.and(post.difficulty.eq(request.getDifficulty()));
        }

        if (request.getIsShaken() != null) {
            builder.and(post.isShaken.eq(request.getIsShaken()));
        }

        if (request.getBaseLiqueurs() != null && !request.getBaseLiqueurs().isEmpty()) {
            List<String> selected = request.getBaseLiqueurs();
            List<String> selectable = baseLiquorRepository.findAll()
                    .stream()
                    .map(BaseLiquor::getName)
                    .collect(Collectors.toList());


            List<Long> postIds = filterPostIdsByBaseLiquors(queryFactory, post, selected, selectable);
            if (!postIds.isEmpty()) {
                builder.and(post.postId.in(postIds));
            } else {
                // 선택 조건을 만족하는 post가 아예 없을 때는 항상 false가 되게 만듦
                builder.and(Expressions.FALSE);
            }
        }


        if (request.getIngredients() != null && !request.getIngredients().isEmpty()) {
            List<String> selected = request.getIngredients();
            List<String> selectable = ingredientReposiroty.findAll()
                    .stream()
                    .map(Ingredient::getName)
                    .collect(Collectors.toList());

            List<Long> postIds = filterPostIdsByIngredient(queryFactory, post, selected, selectable);
            if (!postIds.isEmpty()) {
                builder.and(post.postId.in(postIds));
            } else {
                // 선택 조건을 만족하는 post가 아예 없을 때는 항상 false가 되게 만듦
                builder.and(Expressions.FALSE);
            }
        }

        if (request.getQuery() != null && !request.getQuery().isBlank()) {
            builder.and(post.title.containsIgnoreCase(request.getQuery()));
        }

        // 정렬
        List<Post> results= new ArrayList<>();
        if ("new".equals(request.getSort())) {
            results= queryFactory
                    .selectFrom(post)
                    .where(builder)
                    .orderBy(post.createdAt.desc())
                    .fetch();
        }else {

            QUserLike userLike = QUserLike.userLike;

                results = queryFactory
                    .select(post)
                    .from(post)
                    .leftJoin(userLike).on(userLike.post.eq(post)) // Post ↔ UserLike
                    .where(builder)
                    .groupBy(post.postId) // 그룹핑 필수
                    .orderBy(userLike.count().desc()) // 좋아요 수 기준 정렬
                    .fetch();
        }

        return results.stream().map(p -> PostResponse.builder()
            .postId(p.getPostId())
            .title(p.getTitle())
            .difficulty(p.getDifficulty())
            .isShaken(p.isShaken())
            .likeCount(p.getLikeCount())
            .isLiked(p.getLikes().stream()
                    .anyMatch(userLike -> userLike.getUser().getUserId() == Integer.parseInt(userId)))
            .imageUrl(p.getImageUrl())
                .baseLiqueurs(
                        p.getPostBaseLiquors().stream()
                                .map(postBaseLiquor -> postBaseLiquor.getBaseLiquor().getName())
                                .collect(Collectors.toList())
                )
                .ingredients(
                        p.getPostIndgredients().stream()
                                .map(postIngredient -> postIngredient.getIngredient().getName())
                                .collect(Collectors.toList())
                )
            .build()
        ).toList();
    }

    public List<Long> filterPostIdsByBaseLiquors(
            JPAQueryFactory queryFactory,
            QPost post,
            List<String> selected,
            List<String> selectable
    ) {
        List<String> notSelected = selectable.stream()
                .filter(name -> !selected.contains(name))
                .collect(Collectors.toList());

        QPostBaseLiquor pbl = QPostBaseLiquor.postBaseLiquor;
        QBaseLiquor liquor = QBaseLiquor.baseLiquor;

        return queryFactory
                .select(post.postId)
                .from(post)
                .join(post.postBaseLiquors, pbl)
                .join(pbl.baseLiquor, liquor)
                .groupBy(post.postId)
                .having(
                        // 선택한 주종이 정확히 모두 포함되어야 함
                                new CaseBuilder()
                                        .when(liquor.name.in(selected)).then(liquor.name)
                                        .otherwise((String) null)
                                                .countDistinct().eq((long) selected.size()),

                        // 선택하지 않은 주종이 포함되면 안 됨
                        new CaseBuilder()
                                .when(liquor.name.in(notSelected)).then(1)
                                .otherwise((Integer) null)
                                .countDistinct().eq(0L)
                )
                .fetch();
    }

    public List<Long> filterPostIdsByIngredient(
            JPAQueryFactory queryFactory,
            QPost post,
            List<String> selected,
            List<String> selectable
    ) {


        boolean hasOnlyOthers = selected.size() == 1 && selected.contains("기타");

        if (hasOnlyOthers) {
            // 기타만 선택됐을 땐 모든 postId 반환
            return queryFactory
                    .select(post.postId)
                    .from(post)
                    .fetch();
        }else{
            List<String> notSelected = selectable.stream()
                    .filter(name -> !selected.contains(name))
                    .collect(Collectors.toList());

            QPostIngredient pi = QPostIngredient.postIngredient;
            QIngredient ingredient = QIngredient.ingredient;

            return queryFactory
                    .select(post.postId)
                    .from(post)
                    .join(post.postIndgredients, pi)
                    .join(pi.ingredient, ingredient)
                    .groupBy(post.postId)
                    .having(
                            // 선택한 주종이 정확히 모두 포함되어야 함
                            new CaseBuilder()
                                    .when(ingredient.name.in(selected)).then(ingredient.name)
                                    .otherwise((String) null)
                                    .countDistinct().eq((long) selected.size()),

                            // 선택하지 않은 주종이 포함되면 안 됨
                            new CaseBuilder()
                                    .when(ingredient.name.in(notSelected)).then(1)
                                    .otherwise((Integer) null)
                                    .countDistinct().eq(0L)
                    )
                    .fetch();
        }
    }

}