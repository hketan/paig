import BaseStore from './base_store';
import MAiAssets from '../models/m_ai_assets';

class AIAssetsStore extends BaseStore {
	constructor() {
		super({
		    type: 'ai_assets',
		    baseUrl: 'governance-service/api/ai/assets',
		});
	}

	fetchAIAssets(appId, opts = {}) {
		opts.deserialize = (resp) => {
			let {content, ...page} = resp
            this.page = page;
            return content;
        }
		opts.recordMapper = (json) => new MAiAssets(json);
		return this.fetchAll('', opts);
	}
}

const aiAssetsStore = new AIAssetsStore();
export default aiAssetsStore;