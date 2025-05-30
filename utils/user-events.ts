// User data management utilities

// Get user data from localStorage with default values
export function getUserData() {
  try {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}")
    return {
      name: userData.name || "Vamsi Chanumolu",
      phone: userData.phone || "13800138000",
      email: userData.email || "vamsi.chanumolu@example.com",
      avatar: userData.avatar || "https://randomuser.me/api/portraits/men/44.jpg",
      points: userData.points || 320,
    }
  } catch (error) {
    console.error("Failed to parse user data", error)
    return {
      name: "Vamsi Chanumolu",
      phone: "13800138000",
      email: "vamsi.chanumolu@example.com",
      avatar: "https://randomuser.me/api/portraits/men/44.jpg",
      points: 320,
    }
  }
}

// Update user data in localStorage and trigger update event
export function updateUserData(userData: any) {
  localStorage.setItem("userData", JSON.stringify(userData))

  // Dispatch custom event to notify other components
  window.dispatchEvent(new Event("userDataUpdated"))
}
