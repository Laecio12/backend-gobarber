import { Request, Response } from 'express';
import { container } from 'tsyringe'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UpdateAvatarService from '@modules/users/services/UploadAvatarService';



export default class UserAvatarController {
  public async update( request: Request, response: Response): Promise<Response>{
    const updloadteUserAvatar = container.resolve(UpdateAvatarService);

    const user = await updloadteUserAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });
    delete user.password;
    return response.json(user);
  }
}