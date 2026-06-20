# CampusSpace Loading Skeleton Upgrade

## Plan steps

- [ ] Install/confirm react-loading-skeleton dependency exists
- [ ] Import skeleton CSS in src/main.jsx
- [ ] Create src/components/skeletons/ folder
- [ ] Add skeleton components:
  - [ ] DashboardCardSkeleton.jsx
  - [ ] BookingCardSkeleton.jsx
  - [ ] RoomCardSkeleton.jsx
  - [ ] NotificationSkeleton.jsx
  - [ ] ProfileSkeleton.jsx
  - [ ] EventCardSkeleton.jsx
  - [ ] TableRowSkeleton.jsx
- [ ] Add reusable grid loading pattern (per component) using loading flag
- [ ] Refactor Dashboard.jsx to show 4 dashboard card skeletons while stats load
- [ ] Refactor UpcomingBookings/LiveEvents/ActivityFeed/Dashboard home components to show card skeletons while loading
- [ ] Refactor Rooms.jsx to show RoomCardSkeleton while rooms load
- [ ] Refactor Bookings.jsx to show BookingCardSkeleton while bookings load
- [ ] Refactor Profile.jsx to show ProfileSkeleton while profile data loads
- [ ] Refactor notifications dropdown (Topbar.jsx) to show NotificationSkeleton while notifications load
- [ ] Refactor admin pages/tables to use TableRowSkeleton while loading
- [ ] Remove remaining “Loading...” text/spinners with skeletons
- [ ] Ensure optional chaining/default arrays prevent crashes when data is undefined
- [ ] Run lint/build checks
