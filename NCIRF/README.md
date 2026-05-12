<img width="417" height="126" alt="image" src="https://github.com/user-attachments/assets/b60697e2-9359-4073-a76f-fb9e6ba07e13" />

## Download

### [DOWNLOAD LINK](https://drive.google.com/drive/folders/1B2cI9eewJzRn5DJMaOGJ1RloNv0blxSF?usp=share_link)

Access to the download link is restricted to users with:
- an approved **Software Transfer Agreement (STA)** for non-commercial research use, or  
- a completed **commercial licensing agreement**.

Unlicensed access or redistribution is not permitted.

---

## Available Resources

The following resources are available from the download link:

- `ncirfBatch.csv`  
- `NCIRFX.XXXXXXXX_mac.dmg`  
- `NCIRFX.XXXXXXXX_windows.exe`  
- Recommended citation: **NCIRF2**

---

## Version History

### 2026-5-10 — Official Release (Version 4.20260510)

**GUI**
- Added detailed pregnant phantoms with fetal models for gestational-age dose
  evaluation.
- Expanded the size-dependent phantom library to **362 phantoms**.
- Added an MC calculation progress bar with percent display, a stop button, and
  `Preparing Monte Carlo...` status while transport preparation is in progress.
- Automatically adjusted PSA limits based on SID and phantom size, with PSA
  support from **-90 to 90 degrees**.
- Improved phantom picture resolution and refreshed the size-dependent phantom
  map with clearer selectable cells and selected-cell highlighting.
- Added phantom selection by clicking the phantom map.
- Added field box movement by dragging inside the box or clicking and dragging
  the field center.
- Added field box resizing in top, frontal, and lateral phantom views by
  dragging a box edge; the field center remains fixed and the opposite edge
  changes symmetrically.
- Field box edge resizing updates the Field Width and Field Height input values
  using the current PPA/PSA projection of the beam-normal field size.
- Added cursor up/down key support for numeric input fields.
- Sped up calculation and UI response through backend optimization.

**Batch Manager**
- Added Batch Manager progress percentage display beside the Run checkbox.
- Updated Save Batch CSV output to include input parameters, completion progress, dose columns, and error columns.
- Unified reference, size-dependent, and pregnant phantom batch managers into a single **Batch Manager**.
- Added a unified Phantom Library input for arm raised, arm lowered, arm
  rotated, size-dependent, and pregnant phantom libraries.
- Added editable Batch Manager cells with immediate reflection in the main GUI.
- Added detailed column tooltips on Batch Manager header hover.
- Added `f`/`m` sex input support, while keeping `F`/`M` and `1`/`2` compatible during CSV load.
- Automatically snaps reference phantom age input to the nearest supported reference age.
- Automatically derives size phantom group from age and sex.
- Automatically matches size phantom height and weight to the nearest available phantom grid.
- Added pregnant phantom week input support, e.g., `8wk`, `10wk`, `15wk`.
- Reflected each completed batch row result in the main GUI.
- Removed the output-save prompt at batch run start.
- Stores completed batch dose and error results internally.
- Shows stored dose and error values in the main GUI when a completed batch row is selected.
- Sending the current main GUI setup to Batch Manager now preserves completed
  main GUI dose/error results when available, adding the row as `100%`; when no
  completed result is available, the row is added as input only with `0%`.
- Added Run checkbox support with Select All / Deselect All for Run checkboxes.
- Added CSV save/load with headers.
- Uses Dose and Error column prefixes in saved Batch CSV output, e.g., `Dose Brain` and `Error Brain`.
- Saves incomplete rows with `0%` progress and blank result fields.
- Restores saved completed dose/error results during Batch CSV load.

**API**
- Added support for reference, size-dependent, and pregnant phantom libraries
  through the same API endpoint.
- Added the NCIRF4 API project for REST-style JSON dose calculations.
- Added JSON object input through `/param` using NCIRF4 batch-style keys such as
  `PhtLib`, `Age`, `kVp`, `HVL`, `SID`, `DAP`, `Hist`, and `Thread`.
- Added JSON output with matched phantom metadata, dose values, and error
  percentages.
- Added local REST Client examples in `ncirf4api_test.http`.

### 2024-12-17
**Bug fixes**
- Fixed a calculation failure for the first size-specific phantom
  (female, 85 cm, 10 kg).
- Resolved Windows packaging issues.
- Corrected missing thread information in `ncirf_batch_input_sizespecific.csv`.

### 2024-12-15 — Official Release (Version 3.0.20241215)

**New features**
- Added more than **360 pediatric and adult male and female phantoms** covering a wide range of body sizes.
- Accelerated peak skin dose (PSD) calculation; stable results are achievable
  with approximately 10<sup>5</sup> histories using dose map smoothing.
- Added patient table thickness input for explicit Monte Carlo calculations.
- Added automatic selection of the best-matching x-ray spectrum in **Batch Manager**.
- Added support for numeric patient age in **Batch Manager** as an alternative to age group selection for reference phantoms.
- Added links to the user manual and user forum.

**Bug fixes (from NCIRF 3.0 beta 2024-07-18)**
- Corrected x-ray spectrum selection shift.
- Fixed missing liver voxel tags for phantoms:
  - 2085015
  - 1145030
  - 1175050
- Corrected GUI parameter updates when double-clicking a Batch Manager entry.
- Corrected slight underestimation of active marrow and endosteum doses in abdominal skeletons.
- Corrected field height visualization for 15-year-old and adult phantoms.

### 2024-03-01
- Corrected GEANT4 simulation of field width and field height.
- Corrected Monte Carlo particle accounting for generated and collimated particles.

### 2024-02-08
- Added support for batch configurations with HVL formatted as `X.X0`.
- Added peak skin dose (PSD) to batch output.

### 2024-01-24 — Official Release (Version 2.0.20240124)
- Implemented peak skin dose calculation using Monte Carlo radiation transport.
- Added an **arms rotated** phantom library to better simulate upper-extremity radiography examinations.

### 2023-11-16
- Fixed a hardcoded cone-beam divergence issue.
- Enabled arm-rotated posture for upper-extremity radiography simulations.

### 2023-08-12
- Fixed errors in Batch Manager-based runs.
- Increased the maximum number of threads to **24**.

### 2023-05-06
- Added direct MCNP input file generation from Batch Manager.
- Corrected minor visualization issues.

### 2022-12-14 — Official Release (Version 2.0.20220418)

### 2022-04-18
- Corrected simulation handling of custom beam angle inputs.

### 2022-03-17
- Verified NCIRF operation on Windows virtual machines using Parallels.
- Fixed GEANT4 path handling errors on non-English Windows systems.

### 2022-03-07
- Added two reference phantom libraries: arms raised and arms lowered.
- Set the default initial phantom to newborn male.
- Fixed an error that occurred when no file was selected.
