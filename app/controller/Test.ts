import { BaseController } from './baseController';
import { Get, Prefix, Responses, Description, Parameters, TagsAll, Post, Put, Delete, Hidden,Security } from 'egg-shell-decorators-v2';
import { ValidationError } from '../entity/HandleError';
@TagsAll('测试API')
@Prefix('/api/test')
export default class TestController extends BaseController {
    @Get('/:id')
    @Description('根据id获取信息')
    @Parameters([
        { name: 'id', in: 'path', description: 'id', required: true, type: 'string' }
    ])
    @Responses({ 200: { description: '成功', schema: { type: 'object', $ref: '#/definitions/Response' } } })
	@Security([{ ApiKeyAuth: [] }])
    public async getQualitativeQuantifyConfig({ params: { id } }) {
        return this.success(id);
    }

    @Post('')
    @Description('新增')
    @Parameters([
        {
            name: 'body', in: 'body', required: true, schema: {
                type: 'object',
                properties: {
                    id: { description: 'id', require: true, type: 'integer' },
                    toMaterialNos: {
                        type: 'array', required: true, description: '类型',
                        items: { type: 'string' }
                    }
                }
            }
        }
    ])
    @Responses({ 200: { description: '成功', schema: { type: 'object', $ref: '#/definitions/Response' } } })
	@Security([{ ApiKeyAuth: [] }])
    public async copyCheckScheme({ body }) {
        const rule = {
            checkSettingId: 'number',
            toMaterialNos: {
                type: 'array', itemType: 'string'
            }
        };
        this.ctx.validate(rule, body);
        return this.success('');
    }

    @Put('')
    @Description('更新')
    @Parameters([
        {
            name: 'body', in: 'body', required: true, schema: {
                type: 'object',
                properties: {
                    id: { require: false, type: 'integer', description: 'id' },
                    qualitative: {
                        type: 'array', required: true, description: '定性检验配置项',
                        items: {
                            type: 'object',
                            properties: {
                                checkTypeId: { require: true, type: 'string', description: '检验种类ID' },
                            }
                        }
                    }
                }
            }
        }
    ])
    @Responses({ 200: { description: '成功', schema: { type: 'object', $ref: '#/definitions/Response' } } })
	@Security([{ ApiKeyAuth: [] }])
    public async updateCheckSetting({ body }) {
        const rule = {
            id: 'number?',
            qualitative: {
                type: 'array', itemType: 'object', rule: {
                    checkTypeId: 'number',
                }
            }
        }
        this.ctx.validate(rule, body);
        return this.success('');
    }

    @Delete('/:id')
    @Description('删除')
    @Parameters([
        { name: 'id', in: 'path', description: 'id', required: true, type: 'string' },
    ])
    @Responses({ 200: { description: '成功', schema: { type: 'object', $ref: '#/definitions/Response' } } })
	@Security([{ ApiKeyAuth: [] }])
    public async deleteCheckSettingQualitative({ params: { id } }) {
        if (!id) {
            throw new ValidationError('id 不能为空');
        }
        return this.success('');
    }
}