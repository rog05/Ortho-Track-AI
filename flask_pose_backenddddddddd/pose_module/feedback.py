
def get_angle(a, b, c):
    import numpy as np
    a, b, c = [np.array([pt.x, pt.y]) for pt in [a, b, c]]
    ba = a - b
    bc = c - b
    cosine_angle = np.dot(ba, bc) / (np.linalg.norm(ba) * np.linalg.norm(bc))
    angle = np.arccos(cosine_angle)
    return round(np.degrees(angle), 2)

def get_exercise_feedback(landmarks, exercise):
    if exercise == 'squats':
        hip = landmarks[24]
        knee = landmarks[26]
        ankle = landmarks[28]
        angle = get_angle(hip, knee, ankle)
        if angle < 90:
            return "Good Squat!", 90
        elif angle < 130:
            return "Bend more", 60
        else:
            return "Start Squat", 30

    elif exercise == 'jumping_jacks':
        lh = landmarks[15]
        rh = landmarks[16]
        if lh.y < 0.5 and rh.y < 0.5:
            return "Great Jump!", 90
        else:
            return "Raise hands more", 50

    elif exercise == 'front_arm_raises':
        shoulder = landmarks[12]
        elbow = landmarks[14]
        wrist = landmarks[16]
        angle = get_angle(shoulder, elbow, wrist)
        if 70 <= angle <= 110:
            return "Perfect Raise!", 90
        else:
            return "Raise arms to front", 50

    elif exercise == 'lateral_arm_raises':
        shoulder = landmarks[12]
        elbow = landmarks[14]
        wrist = landmarks[16]
        angle = get_angle(shoulder, elbow, wrist)
        if 70 <= angle <= 110:
            return "Great Form!", 90
        else:
            return "Lift arms to side", 50

    elif exercise == 'side_bends':
        shoulder = landmarks[12]
        hip = landmarks[24]
        knee = landmarks[26]
        angle = get_angle(shoulder, hip, knee)
        if angle < 160:
            return "Nice Bend!", 90
        else:
            return "Bend sideways more", 50

    return "Pose not recognized", 0
