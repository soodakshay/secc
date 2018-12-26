package main

import (
	"time"

	"secc/private/chaincode/core/status"
	"secc/private/chaincode/models"

	"github.com/s7techlab/cckit/router"
)

func (contract *SmartContract) registerUser(context router.Context) (interface{}, error) {

	requestBody := context.Arg(`request`).(models.LocalUserPayload)
	requestBody.LocalUser.MetaInfo = models.MetaInfo{DocType: models.DocTypeLocalUser,
		CreatedAt: time.Now()}

	if insErr := context.State().Insert(requestBody.ID, requestBody.LocalUser); insErr != nil {
		return nil, status.ErrInternal.WithError(insErr)
	}

	return status.NewUserDefined(201, "User registered successfully"), nil
}

// func (contract *SmartContract) loginUser(context router.Context) (interface{}, error) {

// 	requestBody := context.Arg(`request`).(models.LoginRequest)

// 	hashedPassword := xhashes.SHA256(requestBody.Password)

// 	userQuery := fmt.Sprintf("{"+
// 		"\"selector\":{"+
// 		"\"meta_info.doc_type\":\"%s\","+
// 		"\"email_address\":\"%s\","+
// 		"\"password\":\"%s\""+
// 		"}}", models.DocTypeMember, requestBody.Email, hashedPassword)

// 	context.Logger().Errorf("Query ==> %s", userQuery)

// 	queryIterator, queryErr := context.Stub().GetQueryResult(userQuery)

// 	if queryErr != nil {
// 		return nil, status.ErrInternal.WithError(queryErr)
// 	}

// 	if queryIterator.HasNext() {
// 		queryKV, err := queryIterator.Next()
// 		if err != nil {
// 			return nil, status.ErrInternal.WithError(err)
// 		}

// 		var member models.Member
// 		unMarshallErr := json.Unmarshal(queryKV.Value, &member)
// 		if err != nil {
// 			return nil, status.ErrInternal.WithError(unMarshallErr)
// 		}

// 		loginResponse := models.LoginResponse{Email: member.EmailAddress,
// 			Message: "Success",
// 			UserID:  member.ID}

// 		return loginResponse, nil

// 	}

// 	return status.ErrNotFound.WithMessage("Please enter valid email and password"), nil
// }
