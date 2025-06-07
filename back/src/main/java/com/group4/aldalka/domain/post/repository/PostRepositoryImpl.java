package com.group4.aldalka.domain.post.repository;

import com.group4.aldalka.domain.post.dto.PostSearchCondition;
import com.group4.aldalka.domain.post.dto.request.MypagePostSearchRequest;
import com.group4.aldalka.domain.post.dto.request.PostSearchRequest;
import com.group4.aldalka.domain.post.dto.PostSearchResult;
import com.group4.aldalka.domain.post.entity.*;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import java.util.List;

import static com.group4.aldalka.domain.post.entity.QPost.post;

@Repository
@RequiredArgsConstructor
public class PostRepositoryImpl implements PostRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public PostSearchResult searchPosts(PostSearchRequest postSearchRequest) {
        BooleanBuilder builder = buildCommonConditions(postSearchRequest);

        if (postSearchRequest.getBaseLiqueurs() != null && !postSearchRequest.getBaseLiqueurs().isEmpty()) {
            builder.and(buildBaseLiquorFilter(postSearchRequest));
        }

        if (postSearchRequest.getIngredients() != null && !postSearchRequest.getIngredients().isEmpty()) {
            boolean hasOnlyOthers = postSearchRequest.getIngredients().size() == 1 && postSearchRequest.getIngredients().contains("기타");
            if (!hasOnlyOthers) {
                builder.and(buildIngredientsFilter(postSearchRequest));
            }
        }

        long totalCount = fetchTotalPostCount(builder);
        PostSearchCondition postSearchCondition = PostSearchCondition.builder()
                .page(postSearchRequest.getPage())
                .sort(postSearchRequest.getSort())
                .build();

        List<Post> posts = fetchPosts(postSearchCondition, builder);

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
                JPAExpressions.select(post.postId).distinct()
                        .from(post)
                        .join(post.postBaseLiquors, pbl)
                        .join(pbl.baseLiquor, liquor)
                        .where(liquor.name.in(postSearchRequest.getBaseLiqueurs()))
        );
    }

    private BooleanExpression buildIngredientsFilter(PostSearchRequest postSearchRequest) {
        QPostIngredient pi = QPostIngredient.postIngredient;
        QIngredient ingredient = QIngredient.ingredient;

        return post.postId.in(
                JPAExpressions.select(post.postId).distinct()
                        .from(post)
                        .join(post.postIndgredients, pi)
                        .join(pi.ingredient, ingredient)
                        .where(ingredient.name.in(postSearchRequest.getIngredients()))
        );
    }

    private List<Post> fetchPosts(PostSearchCondition postSearchCondition, BooleanBuilder builder) {
        QUserLike userLike = QUserLike.userLike;

        int page = Math.max(postSearchCondition.getPage(), 1);
        int pageSize = 8;
        long offset = (long) (page - 1) * pageSize;

        if ("like".equals(postSearchCondition.getSort())) {
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

    public List<Post> findPostsByUserAndCondition(Long userId, MypagePostSearchRequest mypagePostSearchRequest) {

        BooleanBuilder builder= new BooleanBuilder();

        builder.and(post.user.userId.eq(userId));

        if (mypagePostSearchRequest.getQuery() != null && !mypagePostSearchRequest.getQuery().isBlank()) {
            buildQueryCondition(mypagePostSearchRequest.getQuery(), builder);
        }

        PostSearchCondition postSearchCondition= PostSearchCondition.builder()
                .page(mypagePostSearchRequest.getPage())
                .sort(mypagePostSearchRequest.getSort()).
                build();

        return fetchPosts(postSearchCondition, builder);

    }

}
