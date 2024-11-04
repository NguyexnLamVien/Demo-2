import path from 'path';
import { newEnforcer, Enforcer } from 'casbin';
import MongooseAdapter from 'casbin-mongoose-adapter';

class Casbin {
  static instance: Casbin;
  adapter: any;
  enforcer!: Enforcer;


  constructor() {
    this.init().then(() => {
      console.log('Initialized casbin');
    });

  }

  static getInstance() {
    if (!Casbin.instance) {
      Casbin.instance = new Casbin();
    }
    return Casbin.instance;
  }

  async init() {
    const model = path.resolve(__dirname, 'model.conf');
    this.adapter = await MongooseAdapter.newAdapter(process.env.MONGODB_URI || 'mongodb://localhost:27017/test_source_base');
    this.enforcer = await newEnforcer(model, this.adapter);
    this.enforcer.initWithAdapter(model, this.adapter)
    await this.enforcer.loadPolicy();
  }

  async addPolicy(roleId: string, obj: string, act: string) {
    return await this.enforcer.addPolicy(roleId, obj, act);
  }
  async removePolicy(roleId: string, obj: string, act: string): Promise<boolean> {
    return this.enforcer.removePolicy(roleId, obj, act);
  }

  async addRoleForUser(userId: string, roleId: string) {
    return await this.enforcer.addRoleForUser(userId, roleId);
  }

  async removeRoleForUser(userId: string, roleId: string): Promise<boolean> {
    return this.enforcer.deleteRoleForUser(userId, roleId);
  }
  async getRolesForUser(userId: string): Promise<string[]> {
    return this.enforcer.getRolesForUser(userId);
  }

  async checkPermission(userId: string[], obj: string, act: string): Promise<boolean> {
    return this.enforcer.enforce(userId, obj, act);
  }
}
export default Casbin.getInstance();


