<img width="410" height="132" alt="image" src="https://github.com/user-attachments/assets/7ca3c5db-9803-4e1c-9c7a-c21d0113b87b" />

## Download

### [DOWNLOAD LINK](https://drive.google.com/drive/folders/1B2cI9eewJzRn5DJMaOGJ1RloNv0blxSF?usp=share_link)

Access to the download link is restricted to users with:
- an approved **Software Transfer Agreement (STA)** for non-commercial research use, or  
- a completed **commercial licensing agreement**.

Unlicensed access or redistribution is not permitted.

---

## Available Resources

The following resources are available from the download link:

- `ncictBatchInput.csv`  
- `NCICTX.XXXXXXXX_mac.dmg`  
- `NCICTX.XXXXXXXX_windows.exe`  
- Recommended citation: **NCICT1**  
- Recommended citation: **NCICT2**

---

## Version History

### 2026-5-2 — Update (Version 4.20260502)
- GUI
  - Highlighted scan start and end lines in bold on hover.
  - Updated GUI Batch calculations to use the same calculation workflow as the API.
  - Updated GUI Batch CSV loading to use the same parameter names as the API JSON input.
  - Removed required phantom-group and `dose_target` inputs; NCICT now infers patient, fetus, or mother dose from the age format and whether height is provided.
  - Updated the recommended Batch CSV parameter order so scan start and end appear after WED.
  - Added Batch CSV support for custom mA profiles by reading numeric cells from the `custom_ma` column through the end of the row when `tcm_strength` is `-1`.
  - Added support for week-based pregnant phantom input in Batch CSV, such as `38wk`.
  - Added closest-phantom matching in batch mode using age, height, weight, and WED.
- API
  - Added water-equivalent diameter (WED)-based phantom selection.
  - Added internal handling for missing optional patient parameters, including height, weight, and WED.
  - Added slice-specific `custom_ma` input when `tcm_strength` is set to `-1`.
  - Standardized JSON input keys: `age`, `sex`, `height`, `weight`, `wed`, `start`, `end`, `kvp`, `tcm_strength`, `head_body`, and `ctdivol`.
  - Removed required phantom-group and `dose_target` inputs; patient, fetus, and mother dose targets are inferred automatically.
  - Added closest-phantom matching based on user-provided age, height, weight, and WED.
  - Added scan range validation after landmark conversion.
  - Improved API error responses for invalid input.

### 2026-4-24
- Corrected displayed DLP values that did not match CTDI<sub>vol</sub> multiplied by scan length.

### 2026-4-15 — Official Release (Version 4.20260415)

- Phantom library
  - Added 9 pediatric phantoms, bringing the size-dependent phantom library to 360 phantoms.
  - Implemented detailed cardiac substructure models for all 360 size-dependent phantoms.
- Dose calculation
  - Recalculated the full dose library for 360 phantoms using the new cardiac models and six x-ray spectra.
  - Adopted ICRP Publication 133 skeletal dose response function.
  - Adopted water-equivalent diameter (WED) for SSDE, calculated per slice from DICOM-converted voxel phantoms.
  - Regenerated TCM profiles for all phantoms using 16 cm and 32 cm reference CTDI phantoms.
  - Added nCTDIw values from CTDI survey data for the following scanners:
    - Siemens: X.cite, Definition Edge, Definition AS+, Definition Flash, Force, Edge Plus
    - GE: Revolution CT
    - United Imaging: uCT 760, uCT 820, uCT 960+
  - Upgraded the batch calculation routine:
    - Made the 12 ICRP reference phantoms selectable by exact height and weight.
    - Added cardiac substructure dose output for all 360 phantoms.
- User interface
  - Recolored 3D mesh phantoms and regenerated high-resolution phantom images.
  - Enabled phantom map-based selection (direct click selection).
  - Redesigned the GUI for improved visibility and usability.
  - Replaced the Batch Mode menu with a dedicated button for improved accessibility.
  - Allowed TCM strength to be entered directly in the text field.
- Backend redesign
  - Converted dose, TCM, and phantom image libraries from CSV to binary format for faster calculations.
  - Redesigned the CTDI library for improved extensibility.

### 2024-12-16
- Fixed an issue where the Batch Run menu did not function correctly.

### 2024-12-15 — Official Release (Version 3.0.20241215)
- Added links to the user manual and user forum.

### 2024-06-26
- Corrected an x-ray spectrum index mismatch between 100 and 120 kVp.

### 2024-02-29
- Corrected TCM profile selection for body phantoms.

### 2024-01-25
- Corrected effective diameter and SSDE updates when the scan range changes.

### 2024-01-24 — Official Release (Version 3.0.20240124)
- Added head CTDI phantom-based TCM profiles to better simulate pediatric CT examinations.
- Removed muscle layers from frontal and rear phantom views to improve visualization of internal anatomy.

### 2023-04-28
- Revised frontal and rear views of ICRP phantoms.

### 2022-12-14 — Official Release (Version 3.0.20221123)

### 2022-11-23
- Published NCICT 2.0:  
  Lee et al., *“CT organ dose calculator size adaptive for pediatric and adult patients,”*  
  **Biomedical Physics & Engineering Express**, 8:065020 (2022).

### 2021-11-23
- Fixed a crash caused by blank lines in batch input files, often introduced during CSV editing in Excel.

### 2021-11-20
- Displayed the tube current profile per image slice alongside phantom visualization.
- Displayed “Average CTDI<sub>vol</sub>” when TCM strength is greater than 0.
- Displayed “Custom CTDI<sub>vol</sub>” when CTDI<sub>vol</sub> is entered manually.
- Fixed multiple TCM-related issues in the batch module.

### 2021-10-27
- Made height and weight fields read-only for body size-dependent phantoms; body size is adjusted using arrow controls.
- Enabled batch input for pregnant women phantoms (phantom group 5) and fetal phantoms (phantom group 6).
- Added User Manual and User Forum menu items under the **Help** menu.

### 2021-10-21
- Derived tube current (mA) from custom CTDI<sub>vol</sub> values and enabled TCM for the derived mA profile.

### 2021-09-15
- Fixed an issue where the program stopped when the batch input file was missing.
- Separated mA and rotation time from mAs to support proper TCM adjustment.
- Added an mA limit to prevent unrealistically high mA values for obese patients in TCM mode.
- Disabled TCM when custom CTDI<sub>vol</sub> is entered.

### 2021-05-20
- Added automatic selection of the best-matching phantom based on patient height and weight in batch mode.

### 2021-05-13 — Official Release (Version 3.0.20210513)
- Added batch calculation functionality (see `ncict_batch_input.csv`).
- Implemented tube current modulation using generic modulation profiles.

### 2021-03-07
- Added effective diameter calculation for pregnant women phantoms.

### 2020-03-12 — Official Release (Version 3.0.20200312)
- Improved scan range dragging speed in the Windows version.

### 2019-12-05
- Added maternal organ dose calculations (NCICT 3.0.20191205).
- Presented NCICT at RSNA 2019.

### 2019-03-01
- Added eight pregnant phantoms with fetal models.
- Enabled fetal organ dose calculations.
- Released NCICT 3.0 build 20190301.

### 2018-11-18 — Official Release (Version 2.0.20181118)
- Added 98 adult phantoms, completing the full set of 351 phantoms.
- Presented NCICTX at AAPM 2018 and renamed the software to NCICT.

### 2016-04-01
- Added 72 adult and 181 pediatric phantoms (NCICTX 20160401).
- Presented NCICTX at AAPM 2016.

### 2015-12-01
- Published NCICT 1.0 in *Journal of Radiological Protection*:  
  Lee et al., JRP (2015).
- Presented NCICT at RSNA 2015.

### 2014-12-01 — Official Release (Version 1.0.20141201)
- Replaced the original NCI phantoms with ICRP pediatric and adult phantoms.

### 2012-04-18
- Translated the MATLAB version to Visual Basic 6.0 (NCICT 1.0.20120418).
- Implemented the batch routine for automated calculations.
- Initiated public beta testing under a non-official data agreement.

### 2011-05-17
- Released the initial NCICT 1.0 version based on NCI phantoms and the MATLAB framework.
