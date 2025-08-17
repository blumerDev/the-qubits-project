package domain

import (
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestShouldReturnInstanceOfUser(t *testing.T) {
	user := NewUser("foo")
	assert.NotNil(t, user)
	assert.Equal(t, "foo", user.ID())
}
