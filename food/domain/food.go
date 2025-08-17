package domain

type Food struct {
	name string
}

func NewFood(name string) *Food {
	return &Food{
		name: name,
	}
}
