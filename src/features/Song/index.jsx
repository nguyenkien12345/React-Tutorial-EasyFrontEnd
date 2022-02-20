import React from "react";
import SongList from "./components/SongList";

function SongFeature(props) {

  const songList = [
    { 
      id: 1, 
      name:"Điều anh biết", 
      thumbnailUrl: "https://photo-playlist-zmp3.zadn.vn/v2/background-playlist?src=HavtoclCgWuG7IRz8P-e2RlMQ9lE7wf2-Pyco88Nvmw-ZZgHWqgj3hwOPjpLGV0Ew9zfsj91ebsycchSra6Y3RVCRTpMGgPSq9Wysxv3eLtVd3_3x0VsKPdECPAFI_DRZCapZFSO-rt2W331kH_t1OoHUu_tlaLMJ-vgapP4gajFxMqQhBctYjq1S5JZXhlD8dq&cv=1&size=thumb_240_240"
    },
    {
      id: 2, 
      name:"Gái già tuyển phi công", 
      thumbnailUrl: "https://photo-playlist-zmp3.zadn.vn/s2/v2/background-playlist?src=HavtoclCgWuG7IRm89ZWO3sr_XR5C3U6qBht5iSsk1qJlZI1Q3dpNrhmPyrWTByOIx0XXtHqlnXBi27E8ZstIqEpV9WiRh5DHxqgpIndi4LDl2gHSMQzH4srFPvaER427xji_IWyknSOkNA5UpIzML6wFyjyEEKNGF5nXLxPVbmdTRalthv3wlwqLjd9VwW1-RH5SXGnZE9bYKiyMmw0fI9z&cv=1&size=thumb_240_240"
    },
    {
      id:3,  
      name:"Thiên đàng",
      thumbnailUrl: "https://photo-playlist-zmp3.zadn.vn/s3/v2/background-playlist?src=HavtoclCgWuG7IRf9e7nTLzA5QfgoEjrNqfdwIJDe3SM13IbB83iS0T4TEzfWBjmKqGZzslCkYC052MWEycvALD78w4wbBvmKHqbysgLiY4AJZBx8yA-PrX0OvXlnxHoNq9zu3pFiZmMGJ2kEyFgSWSAVk0AYRcJ-Gmtvp0aEJaExx_QFcfs1WAe-ii&cv=1&size=thumb_240_240"
    }
  ]

  return (
    <div>
      <h3>Song List</h3>
      <SongList songList={songList}/>
    </div>
  );
}

export default SongFeature;
