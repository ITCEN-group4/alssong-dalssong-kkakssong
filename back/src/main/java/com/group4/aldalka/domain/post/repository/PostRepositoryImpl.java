package com.group4.aldalka.domain.post.repository;

import com.group4.aldalka.domain.post.dto.request.MypagePostSearchRequest;
import com.group4.aldalka.domain.post.dto.request.PostSearchRequest;
import com.group4.aldalka.domain.post.dto.PostSearchResult;
import com.group4.aldalka.domain.post.entity.*;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;

import static com.group4.aldalka.domain.post.entity.QPost.post;

@Slf4j
@Repository
@RequiredArgsConstructor
public class PostRepositoryImpl implements PostRepositoryCustom {

    private final JPAQueryFactory queryFactory;
    private static final String ETC = "기타";

    @Override
    public PostSearchResult searchPosts(PostSearchRequest postSearchRequest) {
        BooleanBuilder builder = buildCommonConditions(postSearchRequest);

        if (postSearchRequest.getBaseLiqueurs() != null && !postSearchRequest.getBaseLiqueurs().isEmpty()) {
            builder.and(buildBaseLiquorFilter(postSearchRequest));
        }

        if (postSearchRequest.getIngredients() != null && !postSearchRequest.getIngredients().isEmpty()) {
            boolean hasOnlyOthers = postSearchRequest.getIngredients().size() == 1
                    && postSearchRequest.getIngredients().contains("기타");

            if (hasOnlyOthers) {
                builder.and(buildOnlyEtcIngredientsFilter());
            } else {
                builder.and(buildIngredientsFilter(postSearchRequest));
            }
        }

        long totalCount = fetchTotalPostCount(builder);

        List<Post> posts = fetchPosts(postSearchRequest.getPage(), postSearchRequest.getSort(), builder);

        return new PostSearchResult(posts, totalCount);
    }


    public BooleanBuilder buildCommonConditions(PostSearchRequest postSearchRequest) {
        BooleanBuilder builder = new BooleanBuilder();

        if (postSearchRequest.getIsOfficial() != null) {
            builder.and(post.isOfficial.eq(postSearchRequest.getIsOfficial()));
        }
        if (postSearchRequest.getDifficulty() != null) {
            builder.and(post.difficulty.eq(postSearchRequest.getDifficulty()));
        }
        if (postSearchRequest.getIsShaken() != null) {
            builder.and(post.isShaken.eq(postSearchRequest.getIsShaken()));
        }
        if (postSearchRequest.getQuery() != null && !postSearchRequest.getQuery().isBlank()) {
            buildQueryCondition(postSearchRequest.getQuery(), builder);
        }

        return builder;
    }

    private void buildQueryCondition(String query, BooleanBuilder builder) {

        builder.and(
                post.title.containsIgnoreCase(query)
                        .or(post.content.containsIgnoreCase(query))
                        .or(post.recipe.containsIgnoreCase(query))
        );

    }

    private BooleanExpression buildBaseLiquorFilter(PostSearchRequest postSearchRequest) {
        QPostBaseLiquor pbl = QPostBaseLiquor.postBaseLiquor;
        QBaseLiquor liquor = QBaseLiquor.baseLiquor;

        return post.postId.in(
                JPAExpressions
                        .select(post.postId)
                        .from(post)
                        .join(post.postBaseLiquors, pbl)
                        .join(pbl.baseLiquor, liquor)
                        .where(liquor.name.in(postSearchRequest.getBaseLiqueurs()))
                        .groupBy(post.postId)
                        .having(liquor.name.countDistinct().eq((long) postSearchRequest.getBaseLiqueurs().size()))
        );
    }
    private BooleanExpression buildOnlyEtcIngredientsFilter() {

        QPostIngredient pi = QPostIngredient.postIngredient;
        QIngredient ingredient = QIngredient.ingredient;

        return post.postId.in(
                JPAExpressions
                        .select(post.postId)
                        .from(post)
                        .join(post.postIndgredients, pi)
                        .join(pi.ingredient, ingredient)
                        .groupBy(post.postId)
                        .having(
                                ingredient.name.count().eq(1L) // ingredient가 딱 1개이고
                                        .and(ingredient.name.max().eq(ETC)) // 그게 "기타"일 때만
                        )
        );

    }

    private BooleanExpression buildIngredientsFilter(PostSearchRequest postSearchRequest) {
        QPostIngredient pi = QPostIngredient.postIngredient;
        QIngredient ingredient = QIngredient.ingredient;

        List<String> filteredIngredients = postSearchRequest.getIngredients().stream()
                .filter(ing -> !ETC.equals(ing))
                .toList();

        log.info(Arrays.toString(filteredIngredients.toArray()));

        return post.postId.in(
                JPAExpressions
                        .select(post.postId)
                        .from(post)
                        .join(post.postIndgredients, pi)
                        .join(pi.ingredient, ingredient)
                        .where(ingredient.name.in(filteredIngredients))
                        .groupBy(post.postId)
                        .having(ingredient.name.countDistinct().eq((long) filteredIngredients.size()))
        );

    }
    private List<Post> fetchPosts(Integer page, String sort, BooleanBuilder builder) {

        QUserLike userLike = QUserLike.userLike;

        int pages = Math.max(page, 1);
        int pageSize = 8;
        long offset = (long) (pages - 1) * pageSize;

        if ("like".equals(sort)) {
            return queryFactory
                    .selectFrom(post)
                    .leftJoin(userLike).on(userLike.post.eq(post))
                    .where(builder)
                    .groupBy(post.postId)
                    .orderBy(userLike.likeId.count().desc())
                    .offset(offset)
                    .limit(pageSize)
                    .fetch();
        } else {
            return queryFactory
                    .selectFrom(post)
                    .where(builder)
                    .orderBy(post.updatedAt.desc())
                    .offset(offset)
                    .limit(pageSize)
                    .fetch();
        }
    }

    private Long fetchTotalPostCount(BooleanBuilder builder) {

        return queryFactory
                .select(post.count())
                .from(post)
                .where(builder)
                .fetchOne();
    }

    public PostSearchResult findPostsByUserAndCondition(Long userId, MypagePostSearchRequest mypagePostSearchRequest) {

        BooleanBuilder builder = new BooleanBuilder();

        builder.and(post.user.userId.eq(userId));

        if (mypagePostSearchRequest.getQuery() != null && !mypagePostSearchRequest.getQuery().isBlank()) {
            buildQueryCondition(mypagePostSearchRequest.getQuery(), builder);
        }

        long totalCount = fetchTotalPostCount(builder);
        List<Post> posts = fetchPosts(mypagePostSearchRequest.getPage(), mypagePostSearchRequest.getSort(), builder);
        return new PostSearchResult(posts, totalCount);

    }

}
