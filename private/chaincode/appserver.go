package main

import (
	"secc/private/chaincode/core/status"
	"secc/private/chaincode/models"
	"time"

	"github.com/s7techlab/cckit/router"
)

func (contract *SmartContract) registerApplicationServer(context router.Context) (interface{}, error) {

	requestBody := context.Arg(`request`).(models.AppServerPayload)
	requestBody.AppServer.MetaInfo = models.MetaInfo{DocType: models.DocTypeAppServer,
		CreatedAt: time.Now()}

	if insErr := context.State().Insert(requestBody.ID, requestBody.AppServer); insErr != nil {
		return nil, status.ErrInternal.WithError(insErr)
	}

	return status.NewUserDefined(200, "Application server registered"), nil
}
