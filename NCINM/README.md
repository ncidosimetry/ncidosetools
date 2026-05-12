<img width="397" height="119" alt="image" src="https://github.com/user-attachments/assets/7dc47e5b-ea40-4e7d-883a-2997978b921e" />

## Download

### [DOWNLOAD LINK](https://drive.google.com/drive/folders/1B2cI9eewJzRn5DJMaOGJ1RloNv0blxSF?usp=share_link)

Access to the download link is restricted to users with:
- an approved **Software Transfer Agreement (STA)** for non-commercial research use, or  
- a completed **commercial licensing agreement**.

Unlicensed access or redistribution is not permitted.

---

## Available Resources

The following resources are available from the download link:

- `NCINM3.20260510_XXXXXXXX_mac.dmg`
- `NCINM3.20260510_XXXXXXXX_windows.exe`
- `NCINM3.20260510` user manual
- `NCINM3.20260510 API` user manual
- Recommended citation: **NCINM1**  
- Recommended citation: **NCINM2**

---

## Version History

### 2026-5-10 — Development Update (Version NCINM3.20260510)
- Expanded the radionuclide S-value library to **1070 radionuclides** based on
  photon and electron emissions parsed from the **ICRP Publication 107**
  radiation spectrum file.
- Added a fetus phantom library with gestational ages of **8, 10, 15, 20, 25,
  30, 35, and 38 weeks**.
- Added mother-to-fetus SAF-based S values for maternal source regions and
  fetal target organs.
- Added fetal target-organ masses and maternal source-region volumes, including
  placenta and amniotic fluid source regions.
- Updated `LibSValues` to include NCI, ICRP, and mother-to-fetus/fetus S-value
  data.
- Updated `LibPhantomViews` with fetus phantom views for the new gestational
  ages.
- Kept the Radiopharmaceutical tab blank for fetus phantom calculations because
  pregnancy-specific radiopharmaceutical biokinetic models are not currently
  defined. Fetus calculations should use the Radionuclide tab with user-entered
  maternal source-region data.
- Reorganized runtime resources so compact CSV data remain embedded with the
  project while large binary libraries are copied as application resources.

### 2026-5-1 — Development Update (Version NCINM3.20260501)
- Reorganized the NCINM3 interface with separate NCI and ICRP phantom tabs, each
  with its own sex and age controls to support future phantom-library expansion.
- Updated the phantom display to load selected phantom images from the binary
  `LibPhantomViews` runtime library and draw them to fill the display canvas.
- Updated the radionuclide menu to load entries from `data_radionuclide.csv`
  instead of GUI initial values.
- Standardized radiopharmaceutical name and biokinetic data loading using
  `data_biokinetic_20231219.csv`.
- Converted S-value loading to a binary `LibSValues` library for faster startup
  and smaller runtime data handling.
- Added a reusable S-value library build workflow under `_library3.20260501`,
  including the Python generator, README, and source `svalues*` files.
- Updated source and target listboxes with header rows, adjusted column widths,
  and automatic shading for source rows with non-zero residence time.
- Updated API input to named JSON fields with common aliases for phantom library,
  sex, age, radiopharmaceutical, and administered activity.
- Expanded API output with `input`, `phantom_age_match`,
  `radiopharmaceutical_match`, and `dose_mGy` JSON sections.
- Added arbitrary patient-age matching to the nearest available NCINM phantom age
  group.
- Added API radiopharmaceutical matching for clinical-style names and common
  radionuclide notation variants such as `F-18`, `18F`, `Tc-99m`, and `99mTc`.
- Added local API test file `_ncinm3api_test.http`.

### 2024-12-15 — Official Release (Version 2.0.20241215)
- Added links to the user manual and user forum.
- Corrected radionuclide selection when switching radiopharmaceuticals.

### 2024-01-24 — Official Release (Version 2.0.20240124)
- Added biokinetic models developed for pediatric thyroid cancer patients
  (Kwon et al., *Journal of Radiological Protection*, 2023).
- Added biokinetic models developed for adult thyroid cancer patients
  (Kwon et al., *Journal of Radiological Protection*, in press).
- Removed biokinetic models derived from older ICRP Publications 53, 80, and 106
  when updated data from **ICRP Publication 128** were available.

### 2022-12-15
- Corrected mismatches between radionuclides and radiopharmaceuticals.
- Sorted radiopharmaceutical names alphabetically.
- Revised the effective dose calculation algorithm.

### 2022-12-14 — Official Release (Version 2.0.20221214)
- Published NCINM 2.0:  
  Villoing et al., *“Organ dose calculator for diagnostic nuclear medicine patients based on the ICRP reference voxel phantoms and biokinetic models,”*  
  **Biomedical Physics & Engineering Express**, 9:015004 (2023).
- Included blood mass in target-organ mass for ICRP pediatric and adult phantoms
  when blood is the source region, consistent with **ICRP Publication 133**.
- Extended biokinetic data to **230 radiopharmaceuticals**
  (ICRP Publications 53, 80, 106, and 128).

### 2022-11-09
- Fixed issues related to radionuclide and radiopharmaceutical mismatches.
- Enabled copy and paste by mouse dragging.

### 2022-09-19
- Updated adult gastrointestinal tract self- and cross-fire SAFs using
  **ICRP Publication 133**.
- Fixed an issue that prevented S-value export for ICRP phantoms.

### 2022-05-12
- Added biokinetic data for four additional radiopharmaceuticals.
- Corrected ovary data issues in the ICRP 15-year-old female phantom.

### 2022-04-20
- Revised NCI phantom-based active marrow and endosteum SAFs and S values using
  the latest dose response functions adopted by **ICRP Committee 2**.

### 2022-03-29
- Corrected logical errors in skeletal dose calculations.
- Removed effective dose calculations based on ICRP Publication 60 tissue
  weighting factors.
- Added effective dose calculations using ICRP Publication 103 tissue weighting
  factors to the target-organ dose values automatically copied to the clipboard.
- Corrected blood-inclusive target organ mass values.
- Extended biokinetic data to **101 radiopharmaceuticals**
  (ICRP Publications 53, 80, and 106).

### 2021-11-29
- Implemented frontal images of ICRP voxel phantoms, replacing frontal images of
  NCI hybrid phantoms.

### 2021-11-13
- Corrected the zero adipose mass issue for the ICRP newborn female phantom.
- Fixed errors in the Windows installation file.
- Revised the user interface to be more compact.

### 2021-10-19
- Added biokinetic data for a total of **62 radiopharmaceuticals**.
- Added User Manual and User Forum menu items under the **Help** menu.

### 2021-05-15
- Added blood mass to target organ mass in ICRP pediatric reference phantoms,
  consistent with adult ICRP phantoms in **ICRP Publication 133**.

### 2021-05-13 — Official Release (Version 2.0.20210301)
- Added biokinetic models for 12 radiopharmaceuticals extracted from multiple
  ICRP publications.
- Added S values from the 12 ICRP reference pediatric and adult phantoms.

### 2020-07-20
- Published NCINM 1.0:  
  Villoing et al., *“NCINM: organ dose calculator for patients undergoing nuclear medicine procedures,”*  
  **Biomedical Physics & Engineering Express**, 6:055010 (2020).

### 2020-03-12 — Official Release
- Completed comprehensive benchmarking against **OLINDA/EXM 1.0** and **IDAC 2.1**.

### 2019-08-22
- Created NCINM 1.0 based on the 12 NCI reference phantoms.
- Initiated alpha testing.
