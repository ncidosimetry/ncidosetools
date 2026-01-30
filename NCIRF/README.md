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
