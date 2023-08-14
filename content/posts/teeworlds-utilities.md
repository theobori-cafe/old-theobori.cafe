---
title: Teeworlds utilities
description: Asset utilities including skin rendering, extracting, editing and many more for the Teeworlds community.
updatedAt: "2023-07-26"
categories: [
  "Teeworlds",
  "TypeScript",
  "Asset"
]
author: "Théo Bori"
---

# ~

This idea came to me when I was looking for a Teeworlds skin renderer.

The ones that existed didn't suit me, as they didn't really respect the in-game rendering. Either the feet were too far out or the colors were wrong.

So I decided to make my own toolbox to manipulate Teeworlds assets, which we use on skins.tw and for the Teeworlds Data Discord bot. 
Indirectly, other people use it, for example, to render skins in a Discord channel that displays messages in real time (fokkonaut's Discord server)

<p align="center" width="100%">
  <img src="/fokkonaut_bridge.png">
</p>

or in other projects like [TeeAssembler 2.0](https://teeassembler.developer.li/) that used some part of the **`teeworlds-utilites`** code.

# Use cases

### Teeworlds skin rendering

Render a Teeworlds 4K skin with default and custom colors.

```typescript
import {
  Skin,
  ColorCode,
  ColorRGB
} from 'teeworlds-utilities';

const renderTest = async () => {
  const skin = new Skin();

  await skin.load('https://api.skins.tw/database/skins/96AATxN3DEzcGww4QhmduFCsPzaxhZO7Tq6Lh9OI.png');

  skin
    .render()
    .saveRenderAs('default.png')
    .colorTee(
      new ColorCode(6619008),
      new ColorRGB(136, 113, 255),
    )
    .render()
    .saveRenderAs('color.png');
}

try {
  renderTest();
} catch (err) {
  console.error(err);
}
```

### Rendered skins

<p align="center" width="100%">
  <img src="/render_color.png" width="40%">
  <img src="/render_default.png" width="40%">
</p>

### Scene

A custom scene including a rendered skin.

```typescript
import { Scene } from 'teeworlds-utilities';

const sceneTest = async () => {
  const scene = new Scene(
    'data/scenes/schemes/example.json'
  ).preprocess();

  await scene.renderScene();
  scene.saveScene('scene.png')
}

sceneTest();
```

### Rendered scene

<p align="center" width="100%">
  <img src="/scene.png" width="80%">
</p>

### Merge asset parts

Here we are going to merge specific parts from a skin (right) to another (left).

Any Teeworlds asset should works.

<p align="center" width="100%">
  <img src="/ahl_skin.png">
  <img src="/bit_skin.png" width="216px">
</p>


```typescript
import {
  Skin,
  SkinPart
} from 'teeworlds-utilities';

const mergeTest = async () => {
  const skin = new Skin();
  await skin.load('https://api.skins.tw/database/skins/OUZsYUrmUkitNBUAtKyxdiH5EnLBTkBy8tKNPVmi.png');

  const skin_src = new Skin();
  await skin_src.load('https://api.skins.tw/database/skins/6l7fEywyc0hnchjJAqEHVLmYVJIlNe2Cv6HJVNcR.png');

  skin
    .copyParts(
      skin_src,
      SkinPart.FOOT,
      SkinPart.FOOT_SHADOW,
      SkinPart.DEFAULT_EYE,
      SkinPart.ANGRY_EYE,
      SkinPart.BLINK_EYE,
      SkinPart.CROSS_EYE,
      SkinPart.HAPPY_EYE,
      SkinPart.SCARY_EYE,
      SkinPart.HAND_SHADOW,
      SkinPart.HAND,
    )
    .setEyeAssetPart(SkinPart.ANGRY_EYE)
    .render()
    .saveAs('skin.png')
    .saveRenderAs('skin.png')
}

try {
  mergeTest();
} catch (err) {
  console.error(err);
}
```

### New skin

<p align="center" width="100%">
  <img src="/render_new_skin.png">
  <img src="/new_skin.png">
</p>

# Other renders

<p align="center" width="100%">
  <img src="/skin_weapon.png">
  <img src="/skin_weapon_color.png">
</p>

<p align="center" width="100%">
  <img src="/board.png">
</p>

# Try

[*Source*](https://github.com/teeworlds-utilities/teeworlds-utilities)
