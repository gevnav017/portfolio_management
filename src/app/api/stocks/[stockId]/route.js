"use server";

import { NextResponse } from "next/server";
import { userSession } from "@/components/user-server-session";
import db from "@/lib/prisma";
import { formatPrismaError } from "@/components/api-errors";

// get project
export async function GET(req, { params }) {
  try {
    // Authenticate and verify user
    const user = await userSession();

    // If the response is a redirect, return it immediately
    if (user instanceof NextResponse) {
      return user;
    }

    const organizationId = user.organizationId;

    const { projectId } = params;

    const project = await db.projects.findUnique({
      where: {
        id: projectId,
      },
    });

    return NextResponse.json(project);
  } catch (err) {
    console.log(err);
    return NextResponse.json(err.message);
  }
}

// delete project
export async function DELETE(req, { params }) {
  try {
    // Authenticate and verify user
    const user = await userSession();

    // If the response is a redirect, return it immediately
    if (user instanceof NextResponse) {
      return user;
    }

    const { projectId } = params;

    const deletedProject = await db.projects.delete({
      where: {
        id: projectId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Successfully deleted project",
      deletedProject,
    });
  } catch (err) {
    console.error("DELETE Error: ", err);

    // prisma client validation error
    const prismaErr = formatPrismaError(err);
    if (prismaErr) {
      console.log("Prisma Error: ", prismaErr);
      return NextResponse.json(
        { success: false, message: prismaErr.message },
        { status: prismaErr.status }
      );
    }

    // fallback to default error
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while deleting project",
      },
      { status: 500 }
    );
  }
}

// update project
export async function PUT(req, { params }) {
  try {
    // Authenticate and verify user
    const user = await userSession();

    // If the response is a redirect, return it immediately
    if (user instanceof NextResponse) {
      return user;
    }

    const organizationId = user.organizationId;

    const { projectId } = params;
    const data = await req.json();

    const updateProject = await db.projects.update({
      where: {
        id: projectId,
        organizationId,
      },
      data: data,
    });

    return NextResponse.json({
      success: true,
      updateProject,
    });
  } catch (err) {
    console.error("Error updating data: ", err);

    // prisma client validation error
    const prismaErr = formatPrismaError(err);
    if (prismaErr) {
      console.log("Prisma Error: ", prismaErr);
      return NextResponse.json(
        { success: false, message: prismaErr.message },
        { status: prismaErr.status }
      );
    }

    // fallback to default error
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while updating data",
      },
      { status: 500 }
    );
  }
}
