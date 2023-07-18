import Card from '../ui/Card';
import classes from './MeetupItem.module.css';
import {useRouter} from 'next/router';

function MeetupItem(props) {
  const router = useRouter();

  function showDetailsHandler(){
    router.push('/'+props.id);
    // 새페이지를 더미페이지와 연결함 Link 컴포넌트와 같은 역할 

  }
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
