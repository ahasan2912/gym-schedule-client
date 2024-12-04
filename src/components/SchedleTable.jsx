import { FaFile, FaTrash } from "react-icons/fa";
import { MdDone, MdOutlineDoneAll } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ScheduleTable = ({ schedule, idx, scheduleData, setScheduleData }) => {
  const { _id, title, day, date, hour, isCompleted } = schedule;
  // const isCompleted = true;

  const handleDelteBtn = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://gym-server-main.vercel.app/schedule/${id}`, {
          method: "DELETE",
        })
          .then(res => res.json())
          .then(data => {
            // console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
            const reamingData = scheduleData.filter(data => data._id !== id);
            setScheduleData(reamingData);
          })
      }
    });
  }

  const handleUpdateStatus = (id) => {
        fetch(`https://gym-server-main.vercel.app/status/${id}`, {
          method: "PATCH",
        })
        .then(res => res.json())
        .then(data => {
          // console.log(data);
          const newData = scheduleData.map((schedule) => schedule._id === id ? {...schedule, isCompleted:true} : schedule );
          setScheduleData(newData);
        })  
  }

  return (
    <>
      <tr>
        <td>{idx + 1}</td>
        <td>{title}</td>
        <td>{day}</td>
        <td>{date}</td>
        <td>{hour}</td>
        <td>
          <div className="flex gap-4">
            {" "}
            <button className="bg-pink-500 px-4 py-2 rounded text-white">
              <FaTrash onClick={() => handleDelteBtn(_id)} className=""></FaTrash>
            </button>
            <button className="bg-pink-500 px-4 py-2 rounded text-white">
              <Link to={`/update/${_id}`}>
                {" "}
                <FaFile />
              </Link>
            </button>
            <button onClick={()=>handleUpdateStatus(_id)} className="bg-pink-500 px-4 py-2 rounded text-white">
              {isCompleted ? <MdOutlineDoneAll /> : <MdDone/>}
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default ScheduleTable;
