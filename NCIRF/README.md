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

- `ncirf_batch_input_referencesize.csv`  
- `ncirf_batch_input_sizespecific.csv`  
- `NCIRF3.0_XXXXXXXX_mac.dmg`  
- `NCIRF3.0_XXXXXXXX_windows.exe`  
- Recommended citation: **NCIRF2**

---

## Version History

### 2026-5-10 — Official Release (Version 4.20260510)

**New features**
- Added NCIRF4 API project for REST-style JSON dose calculations using the unified batch input model
- Added mouse drag support for moving the field box
- Added field box resizing in top, frontal, and lateral phantom views by dragging
  a box edge; the field center remains fixed and the opposite edge changes
  symmetrically
- Added phantom selection by clicking the phantom map
- Added cursor up/down key support for numeric input fields
- Expanded the size-dependent phantom library to **362 phantoms**
- Added MC calculation progress bar with percent display
- Added stop button for dose calculation
- Added automatic DRF selection
- Added `Preparing Monte Carlo...` progress-bar status while GEANT4 prepares
  the transport calculation before percent progress output begins

**User interface improvements**
- Field box center clicks now move the field box directly, in addition to
  dragging inside the box
- Field box edge resizing updates the Field Width and Field Height input values
  using the current PPA/PSA projection of the beam-normal field size
- Improved phantom picture resolution
- Redrew the size-dependent phantom map directly from phantom availability data with blue selectable cells and a highlighted selected cell
- Added extra top spacing above the phantom map height-axis label for improved readability
- Updated field box and progress indicator accent colors from orange to blue for visual consistency
- Right-aligned dose and error values in the main GUI table
- Automatically adjusted PSA limits based on SID and phantom size
- Updated PSA range to support **-90 to 90 degrees**

**API**
- Accepts JSON object input through `/param` using NCIRF4 batch-style keys such as `PhtLib`, `Age`, `kVp`, `HVL`, `SID`, `DAP`, `Hist`, and `Thread`
- Supports reference, size-dependent, and pregnant phantom libraries through the same API endpoint
- Returns matched phantom metadata, dose values, and error percentages as JSON
- Added local REST Client examples in `ncirf4api_test.http`

**Batch Manager**
- Unified reference, size-dependent, and pregnant phantom batch managers into a single **Batch Manager**
- Added unified Phantom Library input:
  - `1` = arm raised reference phantom
  - `2` = arm lowered reference phantom
  - `3` = arm rotated reference phantom
  - `4` = size-dependent phantom
  - `5` = pregnant phantom
- Added editable Batch Manager cells with immediate reflection in the main GUI
- Batch Manager edits now clear stored dose results only when the cell value
  actually changes; clicking a cell without changing its value preserves results
- Added detailed column tooltips on Batch Manager header hover
- Added compact batch column headers for easier scanning
- Added `f`/`m` sex input support, while keeping `F`/`M` and `1`/`2` compatible during CSV load
- Automatically snaps reference phantom age input to the nearest supported reference age
- Automatically derives size phantom group from age and sex
- Automatically matches size phantom height and weight to the nearest available phantom grid
- Added pregnant phantom week input support, e.g., `8wk`, `10wk`, `15wk`
- Ignores height and weight for reference and pregnant phantoms, leaving them blank in batch rows
- Reflected each completed batch row result in the main GUI
- Added Batch Manager progress percentage display beside the Run checkbox
- Batch Manager run status now also shows `Preparing Monte Carlo...` in the
  main GUI progress bar while the active row is preparing GEANT4 transport
- Removed the output-save prompt at batch run start
- Stores completed batch dose and error results internally
- Shows stored dose and error values in the main GUI when a completed batch row is selected
- Keeps the previous completed dose and error values visible while the next batch row is running
- Sending the current main GUI setup to Batch Manager now preserves completed
  main GUI dose/error results when available, adding the row as `100%`; when no
  completed result is available, the row is added as input only with `0%`
- Added Run checkbox support
- Added Select All / Deselect All for Run checkboxes
- Added CSV save/load with headers
- Updated Save Batch CSV output to include input parameters, completion progress, dose columns, and error columns
- Uses Dose and Error column prefixes in saved Batch CSV output, e.g., `Dose Brain` and `Error Brain`
- Saves incomplete rows with `0%` progress and blank result fields
- Restores saved completed dose/error results during Batch CSV load
- Added unified MCNP input generation for all phantom libraries

**Size phantom selection**
- Automatically matches entered height and weight to the nearest phantom grid
- Added cursor up/down control for height and weight phantom bins

**Performance improvements**
- Optimized backend performance for faster calculation and UI updates

**Bug fixes**
- Fixed batch dose values being saved as zero by applying DAP correctly during batch tally parsing

### 2024-12-17
**Bug fixes**
- Fixed calculation failure for the first phantom  
  (female, 85 cm, 10 kg) in the size-specific phantom library
- Windows version packaging issues resolved
- `ncirf_batch_input_sizespecific.csv`: missing thread information corrected

### **2024-12-15 — Official Release (Version 3.0.20241215)**

**New features**
- Over **360 pediatric and adult male and female phantoms** with a wide range of body sizes added
- Peak skin dose (PSD) calculation accelerated  
  (stable results achievable with ~10<sup>5</sup> histories using dose map smoothing)
- Patient table thickness input added for explicit Monte Carlo calculations
- Automatic selection of the best-matching x-ray spectrum in **Batch Manager**
- Patient age (numeric) may be used in **Batch Manager** instead of age group for reference phantoms
- Links to the user manual and user forum added

**Bug fixes (from NCIRF 3.0 beta 2024-07-18)**
- X-ray spectrum selection shift corrected
- Missing liver voxel tags fixed for phantoms:
  - 2085015
  - 1145030
  - 1175050
- Double-clicking a Batch Manager entry now correctly updates GUI parameters
- Slight underestimation of active marrow and endosteum doses in abdominal skeletons corrected
- Incorrect visualization of field height for 15-year-old and adult phantoms fixed

### 2024-03-01
- Field width and height not properly simulated in GEANT4 corrected
- Monte Carlo particle accounting (generated vs. collimated) corrected

### 2024-02-08
- Batch configurations with HVL formatted as X.X0 now supported
- Peak skin dose (PSD) included in batch output

### **2024-01-24 — Official Release (Version 2.0.20240124)**
- Peak skin dose calculation implemented via Monte Carlo radiation transport
- New phantom library with **arms rotated** added to better simulate upper-extremity x-ray examinations

### 2023-11-16
- Hardcoded cone-beam divergence bug fixed
- Arm-rotated posture enabled for upper-extremity radiography simulations

### 2023-08-12
- Errors in Batch Manager–based runs fixed
- Maximum number of threads increased to **24**

### 2023-05-06
- MCNP input files can now be generated directly from Batch Manager
- Minor visualization issues corrected

### **2022-12-14 — Official Release (Version 2.0.20220418)**

### 2022-04-18
- Custom beam angle inputs now correctly reflected in simulations

### 2022-03-17
- NCIRF successfully running on Windows virtual machines via Parallels
- Errors related to GEANT4 path handling on non-English Windows systems fixed

### 2022-03-07
- Two phantom libraries (arms raised and arms lowered) available
- Default initial phantom set to newborn male
- Error fixed when no file is selected in
