<img width="385" height="129" alt="image" src="https://github.com/user-attachments/assets/6953bc8e-3627-48f9-b930-8c3b35106315" />

## Download

### [DOWNLOAD LINK](https://drive.google.com/drive/folders/1B2cI9eewJzRn5DJMaOGJ1RloNv0blxSF?usp=share_link)

Access to the download link is restricted to users with:
- an approved **Software Transfer Agreement (STA)** for non-commercial research use, or  
- a completed **commercial licensing agreement**.

Unlicensed access or redistribution is not permitted.

---

## Available Resources from the Download Link

### Download Folder Organization

- **niigz/**
  Compressed NIfTI (`.nii.gz`) voxel phantom files. The current NIfTI release includes:
  - `nci_reference_arm_highres`
  - `nci_pregnant_arm_highres`
  - `nci_size_arm_highres`
  - `nci_size_arm_lowres`
  - `nci_size_armless_highres`
  - `nci_size_armless_lowres`

- **dicomrt/**
  DICOM-RT datasets for supported reference, pregnant, and ICRP phantom libraries.

- **mc-input/**
  Monte Carlo input files for selected phantom libraries. See **Monte Carlo Input Files** below.

- **_archive/**
  Legacy binary voxel files and superseded release files retained for compatibility
  with previous workflows. Binary files were moved to `_archive` because NIfTI is now
  the recommended distribution format for voxel phantoms.

- **_mastertable_ref&size.xlsx**
  Master data table for the NCI reference and body size–dependent phantom library.

### Monte Carlo Input Files

The **mc-input/** folder contains code-specific Monte Carlo input files for selected
phantom libraries:

- **mc-input/mcnp-nci-reference-arm/**
  MCNP input decks for the NCI reference-size phantoms with arms. The folder includes
  12 numbered input files (`01`–`12`) and 12 corresponding lattice files (`*.lat`).

- **mc-input/geant4-icrp-noarm/**
  Geant4 input package for ICRP reference phantoms without arms. The folder includes
  `Ref_noa_icrp_bin_G4.tar.gz`.

These files are provided for established Monte Carlo workflows and may require local
path, source, scoring, compiler, or code-version adjustments before use.

### Phantom Library Naming Convention

**III_SSS_AAA_FFF_RRR**

- **III (Institution)**: `ICRP`, `NCI`
- **SSS (Size)**: `reference`, `size`, `pregnant`
- **AAA (Arm posture)**: `arm` (arms attached), `armless`
- **FFF (File format)**: `dicomrt`, `niigz` (NIfTI `.nii.gz`)
- **RRR (Resolution)**: `high` (default if not indicated), `lowres`

### Available Phantom Libraries

| Institution | Size      | Arm Posture | Format   | Resolution |
|------------|-----------|-------------|----------|------------|
| nci  | reference | arm     | binary (archive) | high |
| nci  | reference | armless | binary (archive) | high |
| nci  | size-dependent | arm | binary (archive) | low<sup>*</sup>|
| nci  | size-dependent | armless | binary (archive) | low<sup>*</sup>|
| nci  | reference | arm | niigz | high |
| nci  | size-dependent | arm | niigz | high |
| nci  | size-dependent | arm | niigz | low |
| nci  | size-dependent | armless | niigz | high |
| nci  | size-dependent | armless | niigz | low |
| nci  | pregnant | arm | niigz | high |
| nci  | reference | arm | mc-input (MCNP) | high |
| icrp | reference | armless | mc-input (Geant4) | high |
| nci  | reference | armless | dicomrt | high |
| nci  | pregnant  | armless | dicomrt | high |
| icrp | reference | armless | dicomrt | high |

<sup>*</sup> The high–voxel-resolution NCI size-dependent library is now available in compressed NIfTI (`.nii.gz`) format. Legacy binary voxel datasets have been moved to `_archive`.

### Master Table

- **#_mastertable_ref&size.xlsx**
  Master data table for the NCI reference & body size–dependent phantom library

---

## Version History

### 2026-05-31
- Added compressed NIfTI (`.nii.gz`) versions of the NCI reference-size, size-dependent, and pregnant phantom libraries
- Released the following NIfTI datasets through the download folder:
  - NCI reference-size phantoms with arms at high resolution
  - NCI pregnant woman phantoms at high resolution
  - NCI size-dependent phantoms with arms at high resolution
  - NCI size-dependent phantoms with arms at low resolution
  - NCI size-dependent armless phantoms at high resolution
  - NCI size-dependent armless phantoms at low resolution
- The reference-size NIfTI dataset includes **12 phantoms**; the size-dependent NIfTI datasets each include **362 phantoms**; the pregnant NIfTI dataset includes **8 phantoms**
- All NIfTI datasets preserve the voxelized organ-label data from the corresponding phantom library
- Moved legacy binary voxel files to the **_archive** folder for compatibility with existing workflows
- NIfTI (`.nii.gz`) is the recommended format for new downloads because it is smaller, includes header metadata, and can be read directly by common medical-imaging software
- The raw binary file size previously made it impractical to release the full high-resolution NCI size-dependent phantom library (**n = 362**) through Google Drive; compressed NIfTI now makes this release practical

### **2025-12-10 — Official Release**
- Expanded anatomical detail across the NCI reference-size and body size–dependent phantom libraries
- Added refined cardiac substructures, including heart chambers, myocardium, coronary arteries, cardiac valves, and conduction nodes
- Incorporated the full **362-phantom** body size–dependent library, including the 11 small pediatric phantoms added in the 2024-01-27 update
- Unified the reference-size and body size–dependent organ master tables to improve consistency in organ definitions, IDs, and metadata
- Recomputed voxel counts, organ volumes, and organ masses using a standardized workflow
- Updated skeletal dose-response functions for marrow and endosteum dose estimation using the latest ICRP-approved data

### **2024-12-14 — Official Release**
- Released the **362 size-specific phantoms** voxelized at low resolution
- Released DICOM-RT datasets (DICOM CT and RT STRUCTURE) for:
  - ICRP reference pediatric and adult phantoms  
  - UF/NCI pregnant women with fetus phantoms  
  - UF/NCI reference-size phantoms  

### 2024-01-27
- Added 11 phantoms to the size-specific phantom library  
  *(total size-specific library now **n = 362**)*

00f051004.3dm
00f065005.3dm
00m051004.3dm
00m065005.3dm
01f065010.3dm
01f075010.3dm
01f095010.3dm
01m065010.3dm
01m075010.3dm
01m095010.3dm
05f115015.3dm

### **2022-12-14 — Official Release**

### 2022-01-25
- Ovary locations adjusted using measurements from Kelsey et al. (2013)
- Breast locations adjusted using CT images from the NWTS cohort
- Updates applied to both reference-size and body size–dependent phantom libraries

### 2021-12-08
- ICRP reference pediatric and adult phantoms released in DICOM-RT format
- Versions available with and without arms

### 2019-01-01
- Methods developed to convert binary voxel phantoms to DICOM-CT and DICOM-STRUCTURE
- Reference-size and body size–dependent libraries converted

### 2018-11-13
- Gamma value adjusted to 1.0 for the following phantoms:

05f105020
05f105025
05m095020
30f165050
30f165100
30f170080
30m160055
30m160060
30m165080
30m165085
30m165090
30m170055
30m175055
30m175060
30m175070
30m175075
30m175085
30m175090
30m190075

### 2018–2014 (Selected Updates)
- Arm structures separated and revoxelized for armless phantoms
- Skeletal layers (cortical and spongiosa) refined
- Organ overlap issues (ovaries, uterus, colon) corrected
- Body size–dependent phantom library completed in collaboration with the University of Florida

### 2010-01-01
- Reference-size pediatric and adult male and female phantoms (n = 12) completed
- Phantoms released in binary voxel format
