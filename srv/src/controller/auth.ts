import { Request, Response, NextFunction } from "express";
import { ValidationError } from "yup";
import { HttpError } from "../util/Error";
import { loginSchema, signupSchema } from "./validators/authSchema";
import Argon from "argon2";
import mysql from "../modelConf/database.config";
export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("here login");

  const error: { field: string; message: string }[] = [];
  if (req.session.userId) {
    return next(new HttpError(405, "user is already logged in!"));
  }
  await loginSchema
    .validate({ ...req.body }, { abortEarly: false })
    .catch(function (err: ValidationError) {
      err.inner.forEach((e: any) => {
        error.push({ field: e.path, message: e!.message });
      });
    });
  if (error.length > 0) {
    return next(new HttpError(400, JSON.stringify(error)));
  }
  const { email, password } = req.body;

  try {
    let selectUser = `select * from user where email = "${email}"`;
    const foundUser = (await new Promise((resolve, reject) => {
      mysql.query(selectUser, (err, result: user[]) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    })) as user[];
    let validity: boolean;
    if (foundUser.length > 0) {
      validity = await Argon.verify(foundUser[0].password, password, {
        version: Argon.argon2id,
      });
    } else {
      validity = false;
    }
    if (!validity) {
      return next(new HttpError(400, "email or password is incorrect"));
    }
    const currUser = foundUser[0];
    req.session.userId = currUser.id;
    res.status(200).json({
      user: {
        email: currUser.email,
        firstName: currUser.first_name,
        lastName: currUser.last_name,
        id: currUser.id,
      },
    });
  } catch (err) {
    return next(new HttpError(500, "something went wrong!"));
  }
};
export const signupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("here");

  if (req.session.userId) {
    return next(new HttpError(405, "user is already logged in!"));
  }
  const error: { field: string; message: string }[] = [];
  await signupSchema
    .validate({ ...req.body }, { abortEarly: false })
    .catch(function (err: ValidationError) {
      err.inner.forEach((e: any) => {
        error.push({ field: e.path, message: e!.message });
      });
    });
  if (error.length > 0) {
    return next(new HttpError(400, JSON.stringify(error)));
  }
  const { firstName, lastName, email, password } = req.body;
  try {
    const hashedPassword = await Argon.hash(password, {
      version: Argon.argon2id,
    });
    let selectUser = `select * from user where email = "${email}"`;
    let userExists = (await new Promise((resolve, reject) => {
      mysql.query(selectUser, (err, result) => {
        if (err) {
          reject("Database error: " + err);
        }
        //@ts-ignore
        if (result && result.length > 0 && result[0]) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    })) as boolean;

    if (userExists) {
      return next(new HttpError(405, "user already exists!"));
    }
    let insertUser = `INSERT INTO user(first_name,last_name,password,email) VALUES ("${firstName}","${lastName}","${hashedPassword}","${email}")`;
    await new Promise((resolve, reject) => {
      mysql.query(insertUser, (err, result) => {
        if (err) {
          reject("Database Error: " + err);
        }
        resolve(result);
      });
    });

    res.status(200).send("user created successfully!");
  } catch (err) {
    return next(new HttpError(500, "something went wrong"));
  }
};
export const logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.session.userId) {
      req.session.destroy((err: Error) => {
        if (err) {
          throw new Error(err.message);
        }
        res.send("user logged out successfuly");
      });
    } else {
      return next(new HttpError(405, "user is not logged in!"));
    }
  } catch (err) {
    return next(new HttpError(500, "something went wrong!"));
  }
};
export const currentUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.session.userId);

    if (req.session.userId) {
      let selectUser = `select * from user where id = "${req.session.userId}"`;
      const foundUser = (await new Promise((resolve, reject) => {
        mysql.query(selectUser, (err, result: user[]) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        });
      })) as user[];
      if (foundUser.length > 0) {
        res.json({
          user: {
            email: foundUser[0].email,
            firstName: foundUser[0].first_name,
            lastName: foundUser[0].last_name,
            id: foundUser[0].id,
          },
        });
      } else {
        return next(new HttpError(500, "something went wrong!"));
      }
    } else {
      return next(new HttpError(405, "user is not logged in!"));
    }
  } catch (err) {
    return next(new HttpError(500, "something went wrong!"));
  }
};
