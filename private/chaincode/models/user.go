package models

type LocalUser struct {
	FirstName   string   `json:"first_name,omitempty"`
	FirstLast   string   `json:"last_name,omitempty"`
	JobTitle    string   `json:"job_title,omitempty"`
	Certificate string   `json:"cert,omitempty"`
	MetaInfo    MetaInfo `json:"meta_info,omitempty"`
}
