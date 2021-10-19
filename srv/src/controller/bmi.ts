import { Response, Request, NextFunction } from "express";
import { HttpError } from "../util/Error";
import mysql from "../modelConf/database.config";
import { addBmiSchema, deleteBmiSchema } from "./validators/bmiSchema";
import { ValidationError } from "yup";
export const getUserBmiController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const currentUserId = req.session.userId;
  if (!currentUserId) {
    return next(new HttpError(405, "user must be logged in!"));
  }

  try {
    let selectUser = `select * from user where id = "${currentUserId}"`;
    const foundUser = (await new Promise((resolve, reject) => {
      mysql.query(selectUser, (err, result: user[]) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    })) as user[];
    if (foundUser.length > 0) {
      let userBmiQuery = `CALL get_user_bmi("${currentUserId}")`;
      const userBmi = (await new Promise((resolve, reject) => {
        mysql.query(userBmiQuery, function (err, result: [any, bmi[]]) {
          if (err) {
            console.log(err);

            reject(err);
          }
          resolve(result[0]);
        });
      })) as bmi[];
      if (userBmi.length > 0) res.json({ bmi: userBmi });
      else {
        return next(new HttpError(404, "user has no bmi history"));
      }
    } else {
      throw new Error();
    }
  } catch (err) {
    return next(new HttpError(500, "Something went wrong!"));
  }
};
export const addBmiController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const currentUserId = req.session.userId;
  if (!currentUserId) {
    return next(new HttpError(405, "user must be logged in!"));
  }
  const { height, weight } = req.body;
  const error: { field: string; message: string }[] = [];
  try {
    await addBmiSchema
      .validate({ ...req.body }, { abortEarly: false })
      .catch(function (err: ValidationError) {
        err.inner.forEach((e: any) => {
          error.push({ field: e.path, message: e!.message });
        });
      });
    if (error.length > 0) {
      return next(new HttpError(400, JSON.stringify(error)));
    }
    let selectUser = `select * from user where id = "${currentUserId}"`;
    const foundUser = (await new Promise((resolve, reject) => {
      mysql.query(selectUser, (err, result: user[]) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    })) as user[];
    if (foundUser.length > 0) {
      console.log(currentUserId);

      let addUserBmiQuery = `INSERT INTO bmi.bmi (height, weight, user_id) VALUES ( ${height}, ${weight}, "${currentUserId}" )`;
      const bmiSuccessStatus = (await new Promise((resolve, reject) => {
        mysql.query(addUserBmiQuery, function (err, result: boolean) {
          if (err) {
            console.log(err);

            reject(err);
          }
          resolve(result);
        });
      })) as boolean;
      if (bmiSuccessStatus) res.status(200).send("bmi successfully added");
      else {
        throw new Error();
      }
    } else {
      throw new Error();
    }
  } catch (err) {
    return next(new HttpError(500, "Something went wrong!"));
  }
};
export const deleteBmiController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const currentUserId = req.session.userId;
  if (!currentUserId) {
    return next(new HttpError(405, "user must be logged in!"));
  }

  const error: { field: string; message: string }[] = [];
  try {
    await deleteBmiSchema
      .validate({ bmiId: req.query.bmiId }, { abortEarly: false })
      .catch(function (err: ValidationError) {
        err.inner.forEach((e: any) => {
          error.push({ field: e.path, message: e!.message });
        });
      });
    if (error.length > 0) {
      return next(new HttpError(400, JSON.stringify(error)));
    }
    let selectUser = `select * from user where id = "${currentUserId}"`;
    const foundUser = (await new Promise((resolve, reject) => {
      mysql.query(selectUser, (err, result: user[]) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    })) as user[];
    if (foundUser.length > 0) {
      const bmiId = req.query.bmiId;
      let deleteUserBmiQuery = `DELETE from bmi where id = "${bmiId}"`;
      const userBmi = (await new Promise((resolve, reject) => {
        mysql.query(deleteUserBmiQuery, function (err, result: boolean) {
          if (err) {
            console.log(err);

            reject(err);
          }
          resolve(result);
        });
      })) as boolean;
      if (userBmi) res.status(200).send("bmi succesfully deleted!");
      else {
        throw new Error();
      }
    } else {
      throw new Error();
    }
  } catch (err) {
    return next(new HttpError(500, "Something went wrong!"));
  }
};
