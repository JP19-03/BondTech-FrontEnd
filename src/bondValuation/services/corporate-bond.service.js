import http from "../../shared/services/http-common.js";

export class CorporateBondService {

    create(corporateBondResource) {
        return http.post("/corporate-bonds", corporateBondResource);
    }

    update(corporateBondResource, id) {
        return http.put("/corporate-bonds/" + id, corporateBondResource);
    }

    getById(id) {
        return http.get("/corporate-bonds/" + id);
    }

    getAllByUserId(userId) {
        return http.get("/corporate-bonds/user/" + userId);
    }

    getAllResultsByUserId(userId) {
        return http.get("/corporate-bonds/user/" + userId + "/results");
    }

    getResultByCorporateBondId(corporateBondId) {
        return http.get("/corporate-bonds/result/" + corporateBondId);
    }

    getAllCashFlowsByResultId(resultId) {
        return http.get("/corporate-bonds/result/" + resultId + "/cash-flows");
    }
}