use tauri::{AppHandle, Manager};

pub fn get_library(app: AppHandle) {
    if let Ok(app_data_path) = app.path().app_data_dir() {
    } else {
    }
}
