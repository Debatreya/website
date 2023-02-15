async function fetchAnnouncements() {
  const announcementsResponse = await fetch(
    'https://api.nksss.live/announcements'
  );
  return (await announcementsResponse.json()).data;
}

export default async function ClubsPage() {
  const announcements: Array<AcademicAnnouncement> = await fetchAnnouncements();

  return (
    <table>
      <tbody>
      {announcements.map((announcement: AcademicAnnouncement, index) => {
        const date = new Date(announcement.date_of_creation);
        return (
          <tr key={index}>
            <td>{date.toLocaleDateString()}</td>
            <td>
              {announcement.subtitle ? (
                <ul>
                  <li>
                    <a href={announcement.title_link} target="_blank">
                      {announcement.title}
                    </a>
                  </li>
                  <li>
                    <a href={announcement.subtitle_link} target="_blank">
                      {announcement.subtitle}
                    </a>
                  </li>
                </ul>
              ) : (
                <a href={announcement.title_link} target="_blank">
                  {announcement.title}
                </a>
              )}
            </td>
          </tr>
        );
      })}
      </tbody>
    </table>
  );
}