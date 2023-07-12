import {FilePostRepository} from "../../../../repositories/server/filePostRepository/filePostRepository";
import {legacyPosts} from "../../../../repositories/server/filePostRepository/legacyPostDatasource";

describe('The file post repository', ()=>{
    const repo = new FilePostRepository(legacyPosts);
    it('gets all posts', async()=>{
        const result = await repo.allPosts().toPromise();
        expect(result).toMatchSnapshot();
    });
});
