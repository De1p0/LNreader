use rusqlite::{Connection, Result};
use std::{fs::File, io::Write, path::PathBuf};
use base64::Engine;
struct MangaManager {
    base_path: PathBuf,
}

impl MangaManager {
    pub fn new(path: PathBuf) -> Self {

        println!("Manga manager Initializzd!");
        MangaManager { base_path: path }
    }

    pub fn get_chapter_page(&self, manga: &str, chapter: &str, page: i32) -> PathBuf {
        self.base_path
            .join(manga)
            .join(format!("{}", chapter))
            .join(format!("{}.png", page))

    }
    pub fn save_chapter_page(&self, manga: &str, chapter: &str, page: i32, page_image: &str) -> Result<(), String> {
        let path: PathBuf = self.get_chapter_page(manga, chapter, page);
        println!("path: {:?}", path);

        if let Some(parent) = path.parent() {
            std::fs::create_dir_all(parent).map_err(|e| format!("Failed to create directories: {}", e))?;
        }

        let bytes = base64::prelude::BASE64_STANDARD.decode(page_image)
            .map_err(|e| format!("Failed to decode image: {}", e))?;

        let mut file: File = File::create(&path)
            .map_err(|e| format!("Failed to create file: {}", e))?;
        file.write_all(&bytes)
            .map_err(|e| format!("Failed to write file: {}", e))?;

        println!("Saved image at: {:?}", path);
        Ok(())
}

}

pub fn initiate(path: &PathBuf) -> Result<()> {
    let manager = MangaManager::new(path.clone()); 

    let _ = manager.save_chapter_page("test", "chapter 30 - pan", 23, "PHN2ZyBpZD0iXzRfeF8zIiBkYXRhLW5hbWU9IjQgeCAzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDYiIGhlaWdodD0iNTM5IiB2aWV3Qm94PSIwIDAgNDA2IDUzOSI+CiAgPGRlZnM+CiAgICA8c3R5bGU+CiAgICAgIC5jbHMtMSB7CiAgICAgICAgZmlsbDogbm9uZTsKICAgICAgICBzdHJva2U6ICMwMDA7CiAgICAgICAgc3Ryb2tlLXdpZHRoOiA2cHg7CiAgICAgIH0KCiAgICAgIC5jbHMtMSwgLmNscy0yIHsKICAgICAgICBmaWxsLXJ1bGU6IGV2ZW5vZGQ7CiAgICAgIH0KICAgIDwvc3R5bGU+CiAgPC9kZWZzPgogIDxwYXRoIGlkPSJfNF94XzNfbGFuZHNjYXBlIiBkYXRhLW5hbWU9IjQgeCAzIGxhbmRzY2FwZSIgY2xhc3M9ImNscy0xIiBkPSJNLTg5Niw2OWg1MzNWNDY5SC04OTZWNjlaIi8+CiAgPHBhdGggaWQ9Il8zX3hfNF9wb3J0cmFpdCIgZGF0YS1uYW1lPSIzIHggNCBwb3J0cmFpdCIgY2xhc3M9ImNscy0xIiBkPSJNMyw1MzZWM0g0MDNWNTM2SDNaIi8+CiAgPHBhdGggaWQ9Il80X3hfMy0yIiBkYXRhLW5hbWU9IjQgeCAzIiBjbGFzcz0iY2xzLTIiIGQ9Ik0tNjc2LjE3OSwyOTMuOTlWMjgzLjYxOWg2LjR2LTguNjgzaC02LjR2LTMyLjdoLTguM2wtMjIuMzU5LDMyLjczMXY4LjY0OGgyMS4wOTRWMjkzLjk5aDkuNTYyWm0tMjEuNDEtMTkuMDU0LDExLjg0OC0xNy42MTR2MTcuNjE0aC0xMS44NDhabTYxLjQ1MywxOS4wNTQsNy42NjQtMTEuNTY2LDcuNTk0LDExLjU2NmgxMi4xMjlsLTEzLjgxNy0xOS42NTIsMTIuNjU3LTE3LjY4NGgtMTEuNmwtNi45NjEsMTAuMjY2LTYuNjA5LTEwLjI2NkgtNjQ3LjE0bDEyLjksMTguMTA2TC02NDcuNywyOTMuOTloMTEuNTY2Wm01Ni4xMDktMy4xNDZhMTYuOTksMTYuOTksMCwwLDAsMTEuNiw0LjAyNSwxNy4wNzMsMTcuMDczLDAsMCwwLDEyLjM0LTQuNzgxLDE1LjQ3NywxNS40NzcsMCwwLDAsNC45NTctMTEuNTY2LDEyLjM0OCwxMi4zNDgsMCwwLDAtMi42NTQtNy45ODEsMTIsMTIsMCwwLDAtNy4wODQtNC4yNTRxNy40MTctNC4wNDIsNy40MTgtMTAuODI4YTEyLjExOCwxMi4xMTgsMCwwLDAtMy42MjEtOC41NzhxLTQuNC00LjY0MS0xMS42NzItNC42NDFhMTcuOTU2LDE3Ljk1NiwwLDAsMC03LjY4MiwxLjYsMTIuOTM3LDEyLjkzNywwLDAsMC01LjM0NCw0LjM5NCwyMC4zNjgsMjAuMzY4LDAsMCwwLTIuODY1LDcuNDcxbDkuMSwxLjU0N2E4LjI2Miw4LjI2MiwwLDAsMSwyLjE4LTUuMTMzLDUuOTU2LDUuOTU2LDAsMCwxLDQuMzI0LTEuNzU4LDUuNTYzLDUuNTYzLDAsMCwxLDQuMTE0LDEuNTQ3LDUuNjEsNS42MSwwLDAsMSwxLjU0Nyw0LjE0OSw2LjIsNi4yLDAsMCwxLTIuMTEsNC45cS0yLjEwOSwxLjg0Ni02LjExNywxLjc0bC0xLjA5LDguMDUxYTE3LjI0NCwxNy4yNDQsMCwwLDEsNC41MzUtLjczOCw2LjM5Miw2LjM5MiwwLDAsMSw0Ljg4NywyLjE3OSw4LjM5Myw4LjM5MywwLDAsMSwyLDUuOTA3LDksOSwwLDAsMS0yLjA5Miw2LjI1OCw2LjY2Niw2LjY2NiwwLDAsMS01LjE1LDIuMzIsNi43MzIsNi43MzIsMCwwLDEtNC44NTItMS45MzQsOS4wNTEsOS4wNTEsMCwwLDEtMi40NjEtNS41OWwtOS41NjIsMS4xNjFBMTUuODE5LDE1LjgxOSwwLDAsMC01ODAuMDI3LDI5MC44NDRaIi8+CiAgPHBhdGggaWQ9Il8zX3hfNCIgZGF0YS1uYW1lPSIzIHggNCIgY2xhc3M9ImNscy0yIiBkPSJNMTMwLjg4LDI5MS44NDRhMTguNTEyLDE4LjUxMiwwLDAsMCwyMy45NDEtLjc1NiwxNS40NzcsMTUuNDc3LDAsMCwwLDQuOTU3LTExLjU2NiwxMi4zNDgsMTIuMzQ4LDAsMCwwLTIuNjU0LTcuOTgxLDEyLDEyLDAsMCwwLTcuMDg0LTQuMjU0cTcuNDE4LTQuMDQyLDcuNDE4LTEwLjgyOGExMi4xMTgsMTIuMTE4LDAsMCwwLTMuNjIxLTguNTc4cS00LjM5NS00LjY0MS0xMS42NzItNC42NDFhMTcuOTU2LDE3Ljk1NiwwLDAsMC03LjY4MiwxLjYsMTIuOTQ0LDEyLjk0NCwwLDAsMC01LjM0NCw0LjM5NCwyMC4zNjgsMjAuMzY4LDAsMCwwLTIuODY1LDcuNDcxbDkuMTA2LDEuNTQ3YTguMjU2LDguMjU2LDAsMCwxLDIuMTc5LTUuMTMzLDUuOTU5LDUuOTU5LDAsMCwxLDQuMzI1LTEuNzU4LDUuMzI1LDUuMzI1LDAsMCwxLDUuNjYsNS43LDYuMTkyLDYuMTkyLDAsMCwxLTIuMTEsNC45cS0yLjEwOSwxLjg0Ni02LjExNywxLjc0bC0xLjA5LDguMDUxYTE3LjI0NSwxNy4yNDUsMCwwLDEsNC41MzYtLjczOCw2LjM5MSw2LjM5MSwwLDAsMSw0Ljg4NiwyLjE3OSw4LjM5Myw4LjM5MywwLDAsMSwyLDUuOTA3LDguOTk0LDguOTk0LDAsMCwxLTIuMDkyLDYuMjU4LDYuNjY1LDYuNjY1LDAsMCwxLTUuMTUsMi4zMiw2LjczNCw2LjczNCwwLDAsMS00Ljg1Mi0xLjkzNCw5LjA1MSw5LjA1MSwwLDAsMS0yLjQ2MS01LjU5bC05LjU2MiwxLjE2MUExNS44MTYsMTUuODE2LDAsMCwwLDEzMC44OCwyOTEuODQ0Wm02My45ODQsMy4xNDYsNy42NjQtMTEuNTY2LDcuNTk0LDExLjU2NmgxMi4xMjlsLTEzLjgxNy0xOS42NTIsMTIuNjU3LTE3LjY4NGgtMTEuNmwtNi45NjEsMTAuMjY2LTYuNjA5LTEwLjI2NkgxODMuODZsMTIuOSwxOC4xMDZMMTgzLjMsMjk0Ljk5aDExLjU2NlptODAuMDUxLDBWMjg0LjYxOWg2LjR2LTguNjgzaC02LjR2LTMyLjdoLTguM2wtMjIuMzU5LDMyLjczMXY4LjY0OGgyMS4wOTNWMjk0Ljk5aDkuNTYzWm0tMjEuNDEtMTkuMDU0LDExLjg0Ny0xNy42MTR2MTcuNjE0SDI1My41MDVaIi8+Cjwvc3ZnPgo=");
    let conn = Connection::open(path.join("manga.db"))?;
    println!("Creating DB at {:?}", path.join("manga.db"));
    conn.execute(
        "CREATE TABLE IF NOT EXISTS manga (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            author TEXT NOT NULL,
            description TEXT,
            image_url TEXT,
            status TEXT
        )",
        [],
    )?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS chapter (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            manga_id INTEGER NOT NULL,
            name TEXT NOT NULL,
            url TEXT NOT NULL,
            scanlator TEXT,
            date_upload TEXT,
            FOREIGN KEY (manga_id) REFERENCES manga(id) ON DELETE CASCADE
        )",
        [],
    )?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS genre (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL
        )",
        [],
    )?;

    conn.execute(
        "CREATE TABLE IF NOT EXISTS manga_genre (
            manga_id INTEGER NOT NULL,
            genre_id INTEGER NOT NULL,
            PRIMARY KEY (manga_id, genre_id),
            FOREIGN KEY (manga_id) REFERENCES manga(id) ON DELETE CASCADE,
            FOREIGN KEY (genre_id) REFERENCES genre(id) ON DELETE CASCADE
        )",
        [],
    )?;

    Ok(())
}
