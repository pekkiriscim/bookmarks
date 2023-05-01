import Sidebar from "./Sidebar";
import PageHeader from "./PageHeader";
import Explore from "./pages/Explore";

function Dashboard() {
  return (
    <div className="grid h-full w-full grid-cols-[17.5rem_1fr]">
      <Sidebar />
      <div>
        <PageHeader />
        <Explore />
      </div>
    </div>
  );
}

export default Dashboard;
