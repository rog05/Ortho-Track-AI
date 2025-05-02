
import cv2
import mediapipe as mp
from feedback import get_exercise_feedback

mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose

def run_pose_tracking(exercise='squats'):
    cap = cv2.VideoCapture(0)
    with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            image.flags.writeable = False
            results = pose.process(image)

            image.flags.writeable = True
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

            if results.pose_landmarks:
                feedback, score = get_exercise_feedback(results.pose_landmarks.landmark, exercise)
                mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)
                cv2.rectangle(image, (0,0), (640,60), (255,255,255), -1)
                cv2.putText(image, f"Score: {score} - {feedback}", (10, 40),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0,0,0), 2, cv2.LINE_AA)

            cv2.imshow('Pose Tracking', image)
            if cv2.waitKey(10) & 0xFF == ord('q'):
                break

    cap.release()
    cv2.destroyAllWindows()
