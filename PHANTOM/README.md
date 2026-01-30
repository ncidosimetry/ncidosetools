# PHANTOM
---

## Download

### [DOWNLOAD LINK](https://drive.google.com/drive/folders/1B2cI9eewJzRn5DJMaOGJ1RloNv0blxSF?usp=share_link)

Access to the download link is restricted to users with:
- an approved **Software Transfer Agreement (STA)** for non-commercial research use, or  
- a completed **commercial licensing agreement**.

Unlicensed access or redistribution is not permitted.

---

## Available Resources from the Download Link

### Phantom Library Naming Convention

**III_SSS_AAA_FFF_RRR**

- **III (Institution)**: `ICRP`, `NCI`
- **SSS (Size)**: `reference`, `bodysize`, `pregnant`
- **AAA (Arm posture)**: `arm` (arms attached), `armless`
- **FFF (File format)**: `binary`, `dicomrt`
- **RRR (Resolution)**: `high` (default if not indicated), `lowres`

### Available Phantom Libraries

| Institution | Size      | Arm Posture | Format   | Resolution |
|------------|-----------|-------------|----------|------------|
| icrp | reference | armless | dicomrt | high |
| nci  | bodysize  | armless | binary  | low |
| nci  | pregnant  | armless | dicomrt | high |
| nci  | reference | arm     | binary  | high |
| nci  | reference | armless | binary  | high |
| nci  | reference | armless | dicomrt | high |

### Master Tables

- **#mastertable_nci_reference.xlsx**  
  Master data table for the NCI reference-size phantom library

- **#mastertable_nci_bodysize.xlsx**  
  Master data table for the NCI body size–dependent phantom library

---

## Version History

### **2024-12-14 — Official Release**
- Added **362 size-specific phantoms** voxelized at low resolution
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
