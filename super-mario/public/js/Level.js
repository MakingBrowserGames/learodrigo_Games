import Compositor from './Compositor.js';
import EntityCollider from './EntityCollider.js';
import MusicController from './MusicController.js';
import TileCollider from './TileCollider.js';

export default class Level {
  constructor () {
    this.gravity = 1500;
    this.totalTime = 0;
    this.comp = new Compositor();
    this.entities = new Set();
    this.entityCollider = new EntityCollider(this.entities);
    this.tileCollider = new TileCollider();
    this.music = new MusicController();
  }

  update (gameContext) {
    this.entities.forEach(entity => {
      entity.update(gameContext, this);
    });

    this.entities.forEach(entity => {
      entity.finalize();
    });

    this.entities.forEach(entity => {
      this.entityCollider.check(entity);
    });

    this.totalTime += gameContext.deltaTime;
  }
}
