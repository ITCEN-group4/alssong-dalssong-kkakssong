package com.group4.aldalka.domain.post.repository;

import com.group4.aldalka.domain.post.dto.PostSearchRequest;
import com.group4.aldalka.domain.post.entity.*;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.group4.aldalka.domain.post.entity.QPost.post;

@Repository
@RequiredArgsConstructor
public class PostRepositoryImpl implements PostRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<Post> searchPosts(PostSearchRequest postSearchRequest) {
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

        return fetchPosts(postSearchRequest, builder);
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
            builder.and(post.title.containsIgnoreCase(postSearchRequest.getQuery()));
            builder.and(post.content.containsIgnoreCase(postSearchRequest.getQuery()));
            builder.and(post.recipe.containsIgnoreCase(postSearchRequest.getQuery()));
        }

        return builder;
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

    private List<Post> fetchPosts(PostSearchRequest postSearchRequest, BooleanBuilder builder) {
        QUserLike userLike = QUserLike.userLike;

        if ("like".equals(postSearchRequest.getSort())) {
            return queryFactory
                    .selectFrom(post)
                    .leftJoin(userLike).on(userLike.post.eq(post))
                    .where(builder)
                    .groupBy(post.postId)
                    .orderBy(userLike.likeId.count().desc())
                    .fetch();
        } else {
            return queryFactory
                    .selectFrom(post)
                    .where(builder)
                    .orderBy(post.updatedAt.desc())
                    .fetch();
        }
    }

}
