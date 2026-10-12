import { useEffect, useState } from "react";

const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5001/api"
    : "https://cac-lifegate-backend.onrender.com/api";

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f3f6f4",
    color: "#1b3026",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    background: "#0c523c",
    color: "#fff",
    padding: "24px 5%",
  },
  container: {
    maxWidth: "1150px",
    margin: "0 auto",
    padding: "30px 20px",
  },
  card: {
    background: "#fff",
    padding: "26px",
    borderRadius: "14px",
    marginBottom: "25px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
  },
  label: {
    display: "block",
    fontWeight: "bold",
    marginBottom: "8px",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px",
    border: "1px solid #d5dfd9",
    borderRadius: "7px",
    marginBottom: "18px",
    fontSize: "15px",
    background: "#fff",
    color: "#1b3026",
  },
  button: {
    background: "#126e51",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "7px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
  },
  secondaryButton: {
    background: "#e7f2ec",
    color: "#126e51",
    border: "none",
    padding: "9px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  dangerButton: {
    background: "#fff0f0",
    color: "#b42318",
    border: "none",
    padding: "9px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
  },
  albumCard: {
    background: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    border: "1px solid #e5ebe7",
  },
  albumImage: {
    width: "100%",
    height: "190px",
    objectFit: "cover",
    background: "#e7eee9",
  },
  albumBody: {
    padding: "16px",
  },
  message: {
    padding: "12px",
    borderRadius: "7px",
    marginBottom: "18px",
  },
};

function AlbumAdmin() {
  const [token, setToken] = useState(
    () => localStorage.getItem("cacAdminToken") || ""
  );

  const [admin, setAdmin] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cacAdmin") || "null");
    } catch {
      return null;
    }
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Church");
  const [eventDate, setEventDate] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [addingToAlbum, setAddingToAlbum] = useState(null);
  const [additionalFiles, setAdditionalFiles] = useState([]);

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
  };

  const clearMessage = () => setMessage("");

  // Shared API request helper.
  const apiRequest = async (path, options = {}) => {
    const headers = {
      ...(options.headers || {}),
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers,
    });

    const data = await response.json().catch(() => ({}));

    if (response.status === 401 && token) {
      localStorage.removeItem("cacAdminToken");
      localStorage.removeItem("cacAdmin");
      setToken("");
      setAdmin(null);

      throw new Error(
        "Your admin session has expired. Please log in again."
      );
    }

    if (!response.ok) {
      throw new Error(data.message || "The request failed.");
    }

    return data;
  };

  // Load the albums from MongoDB.
  const loadAlbums = async () => {
    setLoading(true);

    try {
      const data = await apiRequest("/albums");
      setAlbums(Array.isArray(data) ? data : []);
    } catch (error) {
      showMessage(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAlbums();
    // Load albums when the page opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Admin login.
  const handleLogin = async (event) => {
    event.preventDefault();
    clearMessage();
    setSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || "Admin login failed.");
      }

      if (!data.token) {
        throw new Error("The server did not return an admin token.");
      }

      localStorage.setItem("cacAdminToken", data.token);
      localStorage.setItem(
        "cacAdmin",
        JSON.stringify(data.admin || {})
      );

      setToken(data.token);
      setAdmin(data.admin || null);
      setPassword("");

      showMessage("Login successful. Welcome to the album manager.");
    } catch (error) {
      showMessage(error.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  // Admin logout.
  const handleLogout = () => {
    localStorage.removeItem("cacAdminToken");
    localStorage.removeItem("cacAdmin");

    setToken("");
    setAdmin(null);
    setAlbums([]);
    setPassword("");
    setEmail("");

    showMessage("You have logged out successfully.");
  };

  // Create an album with multiple images.
  const handleCreateAlbum = async (event) => {
    event.preventDefault();
    clearMessage();

    if (selectedFiles.length === 0) {
      showMessage("Please select at least one image.", "error");
      return;
    }

    if (selectedFiles.length > 20) {
      showMessage("You can upload a maximum of 20 images at once.", "error");
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
    ];

    for (const file of selectedFiles) {
      if (!allowedTypes.includes(file.type)) {
        showMessage(
          `${file.name} is not a supported image format.`,
          "error"
        );
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        showMessage(
          `${file.name} exceeds the 5 MB limit.`,
          "error"
        );
        return;
      }
    }

    const formData = new FormData();

    formData.append("title", title.trim());
    formData.append("description", description);
    formData.append("category", category);
    formData.append(
      "eventDate",
      eventDate || new Date().toISOString()
    );

    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    setSubmitting(true);

    try {
      const data = await apiRequest("/albums", {
        method: "POST",
        body: formData,
      });

      showMessage(
        `Album "${data.album.title}" created with ${data.album.images.length} images.`
      );

      setTitle("");
      setDescription("");
      setCategory("Church");
      setEventDate("");
      setSelectedFiles([]);

      const fileInput = document.getElementById("album-images");

      if (fileInput) {
        fileInput.value = "";
      }

      await loadAlbums();
    } catch (error) {
      showMessage(error.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  // Add images to an existing album.
  const handleAddImages = async (albumId) => {
    clearMessage();

    if (additionalFiles.length === 0) {
      showMessage("Select the images you want to add.", "error");
      return;
    }

    if (additionalFiles.length > 20) {
      showMessage("You can add a maximum of 20 images at once.", "error");
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
    ];

    for (const file of additionalFiles) {
      if (!allowedTypes.includes(file.type)) {
        showMessage(
          `${file.name} is not a supported image format.`,
          "error"
        );
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        showMessage(
          `${file.name} exceeds the 5 MB limit.`,
          "error"
        );
        return;
      }
    }

    const formData = new FormData();

    additionalFiles.forEach((file) => {
      formData.append("images", file);
    });

    setSubmitting(true);

    try {
      const data = await apiRequest(
        `/albums/${albumId}/images`,
        {
          method: "POST",
          body: formData,
        }
      );

      showMessage(
        `${additionalFiles.length} image(s) added to "${data.album.title}".`
      );

      setAdditionalFiles([]);
      setAddingToAlbum(null);

      await loadAlbums();
    } catch (error) {
      showMessage(error.message, "error");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete one image.
  const handleDeleteImage = async (album, image) => {
    const confirmed = window.confirm(
      `Delete this image from "${album.title}"? This also removes the image from Cloudinary.`
    );

    if (!confirmed) return;

    clearMessage();

    try {
      const data = await apiRequest(
        `/albums/${album._id}/images/${image._id}`,
        {
          method: "DELETE",
        }
      );

      showMessage(data.message || "Image deleted successfully.");

      await loadAlbums();
    } catch (error) {
      showMessage(error.message, "error");
    }
  };

  // Delete an entire album.
  const handleDeleteAlbum = async (album) => {
    const confirmed = window.confirm(
      `Permanently delete "${album.title}" and all ${album.images.length} of its images? This also removes its Cloudinary images.`
    );

    if (!confirmed) return;

    clearMessage();

    try {
      const data = await apiRequest(`/albums/${album._id}`, {
        method: "DELETE",
      });

      showMessage(data.message || "Album deleted successfully.");

      await loadAlbums();
    } catch (error) {
      showMessage(error.message, "error");
    }
  };

  const totalImages = albums.reduce(
    (total, album) => total + (album.images?.length || 0),
    0
  );

  // Login screen.
  if (!token) {
    return (
      <main style={styles.page}>
        <header style={styles.header}>
          <h1 style={{ margin: 0 }}>CAC LIFEGATE CENTRE</h1>
          <p style={{ marginBottom: 0 }}>Admin Album Manager</p>
        </header>

        <div style={{ ...styles.container, maxWidth: "460px" }}>
          {message && (
            <div
              role="status"
              style={{
                ...styles.message,
                background:
                  messageType === "error" ? "#fff0f0" : "#e7f7ed",
                color:
                  messageType === "error" ? "#b42318" : "#126e51",
              }}
            >
              {message}
            </div>
          )}

          <form style={styles.card} onSubmit={handleLogin}>
            <h2>Administrator Login</h2>

            <p style={{ color: "#607368", lineHeight: 1.6 }}>
              Sign in with your existing CAC Lifegate administrator
              account to manage church photo albums.
            </p>

            <label style={styles.label} htmlFor="admin-email">
              Email Address
            </label>

            <input
              id="admin-email"
              type="email"
              style={styles.input}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your admin email"
              autoComplete="username"
              required
            />

            <label style={styles.label} htmlFor="admin-password">
              Password
            </label>

            <input
              id="admin-password"
              type={showPassword ? "text" : "password"}
              style={styles.input}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />

            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "20px",
                fontSize: "14px",
              }}
            >
              <input
                type="checkbox"
                checked={showPassword}
                onChange={(event) =>
                  setShowPassword(event.target.checked)
                }
              />
              Show password
            </label>

            <button
              type="submit"
              style={{ ...styles.button, width: "100%" }}
              disabled={submitting}
            >
              {submitting ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  // Album management screen.
  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div
          style={{
            maxWidth: "1150px",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "15px",
          }}
        >
          <div>
            <h1 style={{ margin: 0 }}>Lifegate Album Manager</h1>

            <p style={{ marginBottom: 0, color: "#d9eee4" }}>
              Manage your church memories in one place.
            </p>

            {admin?.name && (
              <p style={{ marginBottom: 0, fontSize: "13px" }}>
                Signed in as {admin.name}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleLogout}
            style={{
              ...styles.button,
              background: "#fff",
              color: "#0c523c",
            }}
          >
            Log Out
          </button>
        </div>
      </header>

      <div style={styles.container}>
        {message && (
          <div
            role="status"
            style={{
              ...styles.message,
              background:
                messageType === "error" ? "#fff0f0" : "#e7f7ed",
              color:
                messageType === "error" ? "#b42318" : "#126e51",
            }}
          >
            {message}
          </div>
        )}

        <section style={styles.card}>
          <h2 style={{ marginTop: 0 }}>Gallery Overview</h2>

          <div style={styles.grid}>
            <div>
              <p style={{ color: "#607368", marginBottom: "5px" }}>
                Total Albums
              </p>

              <h2 style={{ margin: 0, fontSize: "30px" }}>
                {albums.length}
              </h2>
            </div>

            <div>
              <p style={{ color: "#607368", marginBottom: "5px" }}>
                Total Album Images
              </p>

              <h2 style={{ margin: 0, fontSize: "30px" }}>
                {totalImages}
              </h2>
            </div>
          </div>
        </section>

        <section style={styles.card}>
          <h2 style={{ marginTop: 0 }}>Create a New Album</h2>

          <p style={{ color: "#607368", lineHeight: 1.6 }}>
            Give your album a title, choose its event date, and select
            multiple pictures. All selected pictures will be grouped
            into the same album.
          </p>

          <form onSubmit={handleCreateAlbum}>
            <label style={styles.label} htmlFor="album-title">
              Album Title *
            </label>

            <input
              id="album-title"
              style={styles.input}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. Children's Anniversary 2026"
              required
            />

            <label style={styles.label} htmlFor="album-description">
              Description
            </label>

            <textarea
              id="album-description"
              style={{ ...styles.input, minHeight: "90px" }}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Write a short description of this event..."
            />

            <label style={styles.label} htmlFor="album-category">
              Category
            </label>

            <select
              id="album-category"
              style={styles.input}
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="Church">Church</option>
              <option value="Sunday Worship">Sunday Worship</option>
              <option value="Anniversary">Anniversary</option>
              <option value="Children">Children</option>
              <option value="Youth">Youth</option>
              <option value="Convention">Convention</option>
              <option value="Prayer">Prayer</option>
              <option value="Outreach">Outreach</option>
              <option value="Other">Other</option>
            </select>

            <label style={styles.label} htmlFor="event-date">
              Event Date
            </label>

            <input
              id="event-date"
              type="date"
              style={styles.input}
              value={eventDate}
              onChange={(event) => setEventDate(event.target.value)}
            />

            <label style={styles.label} htmlFor="album-images">
              Select Pictures *
            </label>

            <input
              id="album-images"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              multiple
              required
              onChange={(event) =>
                setSelectedFiles(Array.from(event.target.files || []))
              }
              style={{ ...styles.input, padding: "12px 0" }}
            />

            <p style={{ fontSize: "13px", color: "#607368" }}>
              Select up to 20 pictures at once. Each image must be
              5 MB or smaller. Supported formats: JPG, PNG, WEBP, GIF.
            </p>

            {selectedFiles.length > 0 && (
              <div
                style={{
                  background: "#e7f2ec",
                  padding: "12px",
                  borderRadius: "7px",
                  marginBottom: "18px",
                }}
              >
                <strong>
                  {selectedFiles.length} picture(s) selected
                </strong>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                    marginTop: "10px",
                  }}
                >
                  {selectedFiles.map((file, index) => (
                    <span
                      key={`${file.name}-${index}`}
                      style={{
                        fontSize: "12px",
                        background: "#fff",
                        padding: "6px 8px",
                        borderRadius: "5px",
                      }}
                    >
                      {file.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button
              type="submit"
              style={styles.button}
              disabled={submitting}
            >
              {submitting
                ? "Uploading Pictures..."
                : "Create Album & Upload Pictures"}
            </button>
          </form>
        </section>

        <section>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
              marginBottom: "20px",
            }}
          >
            <div>
              <h2 style={{ marginBottom: "5px" }}>Your Albums</h2>

              <p style={{ marginTop: 0, color: "#607368" }}>
                View albums, add pictures, or remove unwanted content.
              </p>
            </div>

            <button
              type="button"
              style={styles.secondaryButton}
              onClick={loadAlbums}
              disabled={loading}
            >
              {loading ? "Refreshing..." : "Refresh Albums"}
            </button>
          </div>

          {loading && <p>Loading albums...</p>}

          {!loading && albums.length === 0 && (
            <div style={styles.card}>
              <h3>No albums yet</h3>

              <p>
                Create your first album above. Your uploaded pictures
                will appear here.
              </p>
            </div>
          )}

          <div style={styles.grid}>
            {albums.map((album) => (
              <article key={album._id} style={styles.albumCard}>
                <img
                  src={
                    album.coverImage ||
                    album.images?.[0]?.imageUrl ||
                    ""
                  }
                  alt={album.title}
                  style={styles.albumImage}
                  loading="lazy"
                />

                <div style={styles.albumBody}>
                  <h3 style={{ marginTop: 0, marginBottom: "8px" }}>
                    {album.title}
                  </h3>

                  <p style={{ color: "#607368", fontSize: "13px" }}>
                    {album.category || "Church"} ·{" "}
                    {album.images?.length || 0} pictures
                  </p>

                  {album.description && (
                    <p style={{ lineHeight: 1.6, fontSize: "14px" }}>
                      {album.description}
                    </p>
                  )}

                  {album.eventDate && (
                    <p style={{ fontSize: "13px" }}>
                      Event date:{" "}
                      {new Date(album.eventDate).toLocaleDateString()}
                    </p>
                  )}

                  <button
                    type="button"
                    style={{
                      ...styles.secondaryButton,
                      width: "100%",
                      marginBottom: "10px",
                    }}
                    onClick={() =>
                      setAddingToAlbum(
                        addingToAlbum === album._id ? null : album._id
                      )
                    }
                  >
                    {addingToAlbum === album._id
                      ? "Cancel Add Pictures"
                      : "Add More Pictures"}
                  </button>

                  {addingToAlbum === album._id && (
                    <div
                      style={{
                        background: "#f3f6f4",
                        padding: "12px",
                        borderRadius: "7px",
                        marginBottom: "12px",
                      }}
                    >
                      <label style={styles.label}>
                        Select additional images
                      </label>

                      <input
                        type="file"
                        multiple
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        onChange={(event) =>
                          setAdditionalFiles(
                            Array.from(event.target.files || [])
                          )
                        }
                        style={{
                          width: "100%",
                          marginBottom: "12px",
                        }}
                      />

                      <button
                        type="button"
                        style={{ ...styles.button, width: "100%" }}
                        disabled={submitting}
                        onClick={() => handleAddImages(album._id)}
                      >
                        {submitting ? "Uploading..." : "Upload Images"}
                      </button>
                    </div>
                  )}

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                      gap: "6px",
                      marginBottom: "14px",
                    }}
                  >
                    {album.images?.map((image) => (
                      <div
                        key={image._id}
                        style={{ position: "relative" }}
                      >
                        <img
                          src={image.imageUrl}
                          alt={image.caption || album.title}
                          loading="lazy"
                          style={{
                            width: "100%",
                            height: "75px",
                            objectFit: "cover",
                            borderRadius: "5px",
                          }}
                        />

                        <button
                          type="button"
                          title="Delete this picture"
                          aria-label="Delete this picture"
                          onClick={() =>
                            handleDeleteImage(album, image)
                          }
                          style={{
                            position: "absolute",
                            top: "4px",
                            right: "4px",
                            border: "none",
                            borderRadius: "4px",
                            background: "#fff",
                            color: "#b42318",
                            cursor: "pointer",
                            padding: "3px 6px",
                          }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    style={{
                      ...styles.dangerButton,
                      width: "100%",
                    }}
                    onClick={() => handleDeleteAlbum(album)}
                  >
                    Delete Entire Album
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <footer
          style={{
            textAlign: "center",
            color: "#607368",
            padding: "35px 0 10px",
            fontSize: "13px",
          }}
        >
          CAC Lifegate Centre · Album Management
        </footer>
      </div>
    </main>
  );
}

export default AlbumAdmin;