package domain

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestShouldReturnInstanceOfFood(t *testing.T) {
	food := NewFood("foo")

	assert.NotNil(t, food)
	assert.Equal(t, food.Name, "foo")
}
