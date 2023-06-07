---
title: DOOM modding
description: A library for extracting, building, parsing and updating WAD files.
updatedAt: "2023-05-03"
categories: [
  "Rust",
  "DOOM",
  "WAD"
]
author: "Théo Bori"
---

# ~

This project is a WAD library/manager, it can be used as a base for other WAD projects like a GUI, a CLI, etc..

I have played around with some well known `IWAD` like **`doom.wad`** and **`doom2.wad`** (registered).

To test the `IWAD`/`PWAD` generated, I have used two engines:
- [GZDoom](https://zdoom.org/index) (tests + screenshots)
- [WAD Commander](https://wadcmd.com/) (tests + preview in multiple contexts)

# Use cases

Some use cases you could use in a DOOM modding context.

### IWAD patching

```rust
use tinywad::error::WadError;
use tinywad::models::operation::WadOp;
use tinywad::wad::Wad;

fn main() -> Result<(), WadError> {
    let mut doom_2 = Wad::new();
    doom_2.load_from_file("wads/doom2.wad")?;

    let gate = doom_2.lump("GATE3").unwrap();

    let mut doom_1 = Wad::new();
    doom_1.load_from_file("doom1.wad")?;

    doom_1.select("^FLAT|FLOOR");
    doom_1.update_lumps_raw(&gate.data().buffer);
    doom_1.save("doom1.wad");

    Ok(())
}
```

So basically (above) it loads a first `IWAD` file, in our case it is **`doom2.wad`**. It borrows a lump (**`GATE3`**) into the variable **`gate`**, then we load a second `IWAD` which is **`doom1.wad`**, it selects desired lumps, then it update the selected lumps in `DOOM1` and finally overwrite the file.

### Screenhot(s)

<img src="/doom_gate3.png" width="60%">

### Lumps extracting

```rust
use std::fs;

use tinywad::dir::MAX_PAL;
use tinywad::error::WadError;
use tinywad::models::operation::WadOp;
use tinywad::wad::Wad;

fn main() -> Result<(), WadError> {
    let mut doom_2 = Wad::new();
    doom_2.load_from_file("wads/doom2.wad")?;

    for pal in 0..MAX_PAL {
        doom_2.set_palette(pal);
        doom_2.reload()?;
        doom_2.select("^BOSF");
        
        let dirpath = format!("doom2/pal_{}", pal);

        fs::create_dir_all(dirpath.clone()).unwrap();

        doom_2.save_lumps(dirpath);
    }

    Ok(())
}
```

In this part of code, it extracts as PNG the selected lumps with different palettes (13).

### Extracted lumps (as PNGs)

<p float="left">
  <img src="/doom2/pal_0/BOSFB0.png">
  <img src="/doom2/pal_1/BOSFB0.png">
  <img src="/doom2/pal_2/BOSFB0.png">
  <img src="/doom2/pal_3/BOSFB0.png">
  <img src="/doom2/pal_4/BOSFB0.png">
  <img src="/doom2/pal_5/BOSFB0.png">
  <img src="/doom2/pal_6/BOSFB0.png">
  <img src="/doom2/pal_7/BOSFB0.png">
  <img src="/doom2/pal_8/BOSFB0.png">
  <img src="/doom2/pal_9/BOSFB0.png">
  <img src="/doom2/pal_10/BOSFB0.png">
  <img src="/doom2/pal_11/BOSFB0.png">
  <img src="/doom2/pal_12/BOSFB0.png">
</p>

### Dumping metadata

```rust
use tinywad::error::WadError;
use tinywad::models::operation::WadOp;
use tinywad::wad::Wad;

fn main() -> Result<(), WadError> {
    let mut src = Wad::new();

    src.load_from_file("wads/hexen.wad")?;
    src.dump();

    Ok(())
}
```

### Output

```
Name: XXTIC, Size: 8, Offset: 12
Name: STARTUP, Size: 153648, Offset: 20
Name: PLAYPAL, Size: 21504, Offset: 153668, Palettes amount: 28
Name: COLORMAP, Size: 8704, Offset: 175172
Name: FOGMAP, Size: 8704, Offset: 183876
Name: TINTTAB, Size: 65536, Offset: 192580
Name: TRANTBL0, Size: 256, Offset: 258116
Name: TRANTBL1, Size: 256, Offset: 258372
Name: TRANTBL2, Size: 256, Offset: 258628
...
```

### Building a PWAD from scratch

```rust
use tinywad::error::WadError;
use tinywad::lump::{LumpAdd, LumpAddKind};
use tinywad::models::operation::WadOp;
use tinywad::wad::{Wad, WadKind,};

fn main() -> Result<(), WadError> {
    let mut src = Wad::new();

    let lump_names = [
        "FLOOR0_1", "FLOOR0_3", "FLOOR0_6",
        "FLOOR1_1", "FLOOR1_7", "FLOOR3_3",
        "FLOOR4_1", "FLOOR4_5", "FLOOR4_6",
        "FLOOR4_8", "FLOOR5_1", "FLOOR5_2",
        "FLOOR5_3", "FLOOR5_4", "FLOOR6_1",
        "FLOOR6_2", "FLOOR7_1", "FLOOR7_2",
    ];

    src.load_from_file("doom.wad")?;

    let gate = src.lump("FLOOR6_1").unwrap();

    let mut dest = Wad::new();

    dest.set_kind(WadKind::Pwad);
    dest.add_lump_raw(
        LumpAdd::new(
            LumpAddKind::Back,
            &vec![],
            "FF_START",
        )
    )?;

    for lump_name in lump_names {
        dest.add_lump_raw(
            LumpAdd::new(
                LumpAddKind::Back,
                &gate.data().buffer,
                lump_name,
            )
        )?;
    }

    dest.add_lump_raw(
        LumpAdd::new(
            LumpAddKind::Back,
            &vec![],
            "F_END",
        )
    )?;

    dest.save("doom1_patch.wad");

    Ok(())
}
```

To take the screenshot (below) **`doom1_patch.wad`** has been injected into GZDOOM with the `IWAD` **`doom.wad`** (registered).

### Screenshot(s)

<img src="/doom_floor6_1.png" width="60%">

### Download files(s)

[`doom1_patch.wad`](/doom1_patch.wad)  
[`doom1_patch.asc`](/doom1_patch.asc)  
[`checksum`](/checksum.txt)

### Extracting MIDI lumps

Extracting every musics from the `IWAD` **`doom.wad`**.

```rust
use tinywad::error::WadError;
use tinywad::models::operation::WadOp;
use tinywad::wad::{Wad};

fn main() -> Result<(), WadError> {
    let mut src = Wad::new();

    src.load_from_file("doom.wad")?;
    src.select("D_");
    src.save_lumps(".");

    Ok(())
}
```

### `D_E1M1` converted from MIDI to MP3

<figure>
    <audio
        controls
        src="/D_E1M1.mp3">
    </audio>
</figure>

# Try

[*Source*](https://github.com/theobori/tinywad)
