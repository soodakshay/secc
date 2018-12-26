package models

type AppServerPayload struct {
	ID        string    `json:"_id,omitempty"`
	AppServer AppServer `json:"app_server,omitempty"`
}

type LocalUserPayload struct {
	ID        string    `json:"_id,omitempty"`
	LocalUser LocalUser `json:"local_user,omitempty"`
}

type HIDSScanPayload struct {
	ID       string   `json:"_id,omitempty"`
	HIDSScan HIDSScan `json:"hids_scan,omitempty"`
}

type HIDSIncidentReportPayload struct {
	ID                 string             `json:"_id,omitempty"`
	HIDSIncidentReport HIDSIncidentReport `json:"hids_incident_report,omitempty"`
}

type HIDSWhitelistPayload struct {
	ID            string        `json:"_id,omitempty"`
	HIDSWhitelist HIDSWhitelist `json:"hids_whitelist,omitempty"`
}

type HIDSMasterTreePayload struct {
	ID             string         `json:"_id,omitempty"`
	HIDSMasterTree HIDSMasterTree `json:"hids_master_tree,omitempty"`
}
