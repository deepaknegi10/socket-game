interface IRoomData {
  id: string
  name: string
  owner: string
  type: string
}

interface IUserData {
  id: string
  name: string
  room: string
  roomType: string
}

export type { IRoomData, IUserData }
