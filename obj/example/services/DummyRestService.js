"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DummyRestService = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_5 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
const DummySchema_1 = require("../data/DummySchema");
class DummyRestService extends pip_services3_rpc_nodex_1.RestService {
    constructor() {
        super();
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor("pip-services-dummies", "controller", "default", "*", "*"));
    }
    configure(config) {
        super.configure(config);
    }
    setReferences(references) {
        super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired('controller');
    }
    getPageByFilter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield this._controller.getPageByFilter(req.params.correlation_id, new pip_services3_commons_nodex_2.FilterParams(req.params), new pip_services3_commons_nodex_3.PagingParams(req.params));
                this.sendResult(req, res, result);
            }
            catch (ex) {
                this.sendError(req, res, ex);
            }
        });
    }
    getOneById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield this._controller.getOneById(req.params.correlation_id, req.params.dummy_id);
                this.sendResult(req, res, result);
            }
            catch (ex) {
                this.sendError(req, res, ex);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield this._controller.create(req.params.correlation_id, req.body);
                this.sendCreatedResult(req, res, result);
            }
            catch (ex) {
                this.sendError(req, res, ex);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield this._controller.update(req.params.correlation_id, req.body);
                this.sendResult(req, res, result);
            }
            catch (ex) {
                this.sendError(req, res, ex);
            }
        });
    }
    deleteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield this._controller.deleteById(req.params.correlation_id, req.params.dummy_id);
                this.sendDeletedResult(req, res, result);
            }
            catch (ex) {
                this.sendError(req, res, ex);
            }
        });
    }
    register() {
        this.registerRoute('get', '/dummies', new pip_services3_commons_nodex_4.ObjectSchema(true)
            .withOptionalProperty("skip", pip_services3_commons_nodex_5.TypeCode.String)
            .withOptionalProperty("take", pip_services3_commons_nodex_5.TypeCode.String)
            .withOptionalProperty("total", pip_services3_commons_nodex_5.TypeCode.String), this.getPageByFilter);
        this.registerRoute('get', '/dummies/:dummy_id', new pip_services3_commons_nodex_4.ObjectSchema(true)
            .withRequiredProperty("dummy_id", pip_services3_commons_nodex_5.TypeCode.String), this.getOneById);
        this.registerRoute('post', '/dummies', new pip_services3_commons_nodex_4.ObjectSchema(true)
            .withRequiredProperty("body", new DummySchema_1.DummySchema()), this.create);
        this.registerRoute('put', '/dummies/:dummy_id', new pip_services3_commons_nodex_4.ObjectSchema(true)
            .withRequiredProperty("body", new DummySchema_1.DummySchema()), this.update);
        this.registerRoute('delete', '/dummies/:dummy_id', new pip_services3_commons_nodex_4.ObjectSchema(true)
            .withRequiredProperty("dummy_id", pip_services3_commons_nodex_5.TypeCode.String), this.deleteById);
        this._swaggerRoute = '/dummies/swagger';
        this.registerOpenApiSpecFromFile(__dirname + '/../../../example/services/dummy.yml');
    }
}
exports.DummyRestService = DummyRestService;
//# sourceMappingURL=DummyRestService.js.map