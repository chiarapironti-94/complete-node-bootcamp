import { Request, Response } from 'express'

export const getAllUsers = (_: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
  })
}

export const getUserById = (req: Request, res: Response) => {
  console.log(req.params)
  res.status(200).json({
    status: 'success',
  })
}

export const postUser = (req: Request, res: Response) => {
  console.log(req.body)
  res.status(201).json({
    status: 'success',
  })
}

export const patchUserById = (req: Request, res: Response) => {
  console.log(req.body)
  res.status(201).json({
    status: 'success',
  })
}
export const deleteUserById = (_: Request, res: Response) => {
  res.status(204).json({
    status: 'success',
  })
}
