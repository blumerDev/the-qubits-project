package domain

type Food struct {
	Name string
}

func NewFood(name string) *Food {
	return &Food{
		Name: name,
	}
}
