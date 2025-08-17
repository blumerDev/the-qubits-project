package domain

import (
	"context"
	"log/slog"
)

type Repository interface {
	Save(ctx context.Context, food *Food, user *User) error
}

type InMemoryRepository struct {
	foodsByUser map[string]*Food
}

func (i InMemoryRepository) Save(ctx context.Context, food *Food, user *User) error {
	userId := user.id
	i.foodsByUser[userId] = food
	slog.Info("foods saved", slog.Int("users", len(i.foodsByUser)))

	return nil
}
