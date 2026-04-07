// =============================================
// SKILL-ORBIT — gamification.js
// General Tracking & Future Gamification
// =============================================

/**
 * Local Activity Tracking
 * (Previously used for achievements, now retained for potential future use)
 */
function getTracked(key) {
  const track = JSON.parse(localStorage.getItem('skill_orbit_activity_track') || '{}');
  return track[key];
}

function updateTrack(key, val, increment = true) {
  const track = JSON.parse(localStorage.getItem('skill_orbit_activity_track') || '{}');
  if (increment) track[key] = (track[key] || 0) + val;
  else track[key] = val;
  localStorage.setItem('skill_orbit_activity_track', JSON.stringify(track));
}

// Achievement system removed as per user request.
// functions like checkBadges, renderGamification, and triggerCinematicUnlock are deleted.
