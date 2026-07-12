import {
  Controller,
  fileUpload,
  type RouteHandler,
  type Router,
  type UploadedFile,
} from '@rasenganjs/server';
import { diskStorage } from '@rasenganjs/futon/upload/disk';

/**
 * RFC-0002 playground: Multer-style uploads over futon's fileUpload().
 *
 * Try it (server running via `pnpm dev`):
 *   curl -F avatar=@some.png http://localhost:3006/upload/avatar
 *   curl -F photos=@a.jpg -F photos=@b.jpg http://localhost:3006/upload/gallery
 * Files land in ./uploads/ with random hex names.
 */
const upload = fileUpload({
  storage: diskStorage({ destination: 'uploads/' }),
  limits: { fileSize: 5 * 1024 * 1024, files: 3 },
  fileFilter: (_ctx, info) => !info.mimetype.includes('exe'),
});

export class UploadController extends Controller {
  routes(router: Router) {
    router.post('/upload/avatar', upload.single('avatar'), this.avatar);
    router.post('/upload/gallery', upload.array('photos', 3), this.gallery);
  }

  avatar: RouteHandler = async (ctx) => {
    const file = ctx.get<UploadedFile>('file');
    if (!file) {
      return ctx.res.status(400).json({ error: 'No file on field "avatar".' });
    }
    return ctx.res.json({ ok: true, file });
  };

  gallery: RouteHandler = async (ctx) => {
    const files = ctx.get<UploadedFile[]>('files') ?? [];
    return ctx.res.json({
      ok: true,
      count: files.length,
      files: files.map((f) => ({ originalname: f.originalname, path: f.path })),
    });
  };
}
