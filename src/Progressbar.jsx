import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './Progressbar.css';

const TaskProgress = ({ completed, total }) => {
  const percentage = total > 0 ? (completed / total) * 100 : 100;

  // Determine color based on percentage
  const progressColor = percentage === 100 ? 'green' : percentage > 0 ? 'yellow' : 'red';

  return (
    <div className="task-progress">
      <CircularProgressbar
        value={percentage}
        text={`${Math.round(percentage)}%`}
        styles={buildStyles({
          textSize: "16px",
          pathColor: progressColor === 'green' ? '#2ecc71' : progressColor === 'yellow' ? '#f39c12' : '#e74c3c', // Dynamic path color based on progress
          textColor: '#fff', 
          trailColor: '#d6d6d6', 
        })}
      />
      <p className={progressColor}>Your Progress</p>
    </div>
  );
};

export default TaskProgress;
