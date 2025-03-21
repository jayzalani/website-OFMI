import {
  ShirtSizeName,
  ShirtStyle,
  ShirtStyleName,
  ShirtStyleOfString,
  ShirtStyles,
} from "@/types/shirt";
import { FloatingInput } from "@/components/input/FloatingInput";
import { SectionTitle } from "./sectionTitle";
import { PronounName, Pronouns } from "@/types/pronouns";
import { fieldIds } from "./constants";
import STRAIGHT from "public/shirtStyles/STRAIGHT.png";
import WAISTED from "public/shirtStyles/WAISTED.png";
import { exhaustiveMatchingGuard } from "@/utils";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import { useState } from "react";
import { ParticipationRequestInput } from "@/types/participation.schema";
import { ParticipationRole, ShirtSize } from "@prisma/client";
import { UserRequestInput } from "@/types/user.schema";

function getImageData(shirtStyle: ShirtStyle): StaticImageData {
  switch (shirtStyle) {
    case "STRAIGHT":
      return STRAIGHT;
    case "WAISTED":
      return WAISTED;
    default: {
      return exhaustiveMatchingGuard(shirtStyle);
    }
  }
}

export function PersonalDetails({
  participation,
  role,
}: {
  participation: ParticipationRequestInput | null;
  role: ParticipationRole;
}): JSX.Element {
  const user = participation?.user;
  const [shirtStyle, setShirtStyle] = useState<ShirtStyle | undefined>(
    user?.shirtStyle,
  );
  return (
    <div>
      <SectionTitle title="Datos de contacto" />
      <div className="grid md:grid-cols-2 md:gap-6">
        <FloatingInput
          type="text"
          label="Nombre(s) *"
          defaultValue={user?.firstName}
          id={fieldIds.firstName}
          required
        />
        <FloatingInput
          type="text"
          label="Apellido(s) *"
          defaultValue={user?.lastName}
          id={fieldIds.lastName}
          required
        />
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
        <FloatingInput
          type="text"
          id={fieldIds.preferredName}
          defaultValue={user?.preferredName}
          label={
            role === "CONTESTANT"
              ? "Nombre completo para mostrar en tu diploma"
              : "Nombre preferido"
          }
          placeholder=" "
        />
        <div className="group relative z-0 mb-5 w-full">
          <select
            id={fieldIds.pronouns}
            name={fieldIds.pronouns}
            defaultValue={user?.pronouns}
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
            required
          >
            {Pronouns.map((value) => {
              return (
                <option key={value} value={value}>
                  {PronounName(value)}
                </option>
              );
            })}
          </select>
          <label
            htmlFor={fieldIds.pronouns}
            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >
            Pronombre *
          </label>
        </div>
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
        <FloatingInput
          type="date"
          id={fieldIds.birthDate}
          label="Fecha de nacimiento *"
          defaultValue={user?.birthDate.substring(0, 10)}
          placeholder=" "
          required
        />
        <FloatingInput
          type="text"
          id={fieldIds.governmentId}
          label="CURP *"
          defaultValue={user?.governmentId}
          placeholder=" "
          required
        />
      </div>

      {/* Shirt */}
      <div className="grid md:grid-cols-4 md:gap-6">
        <div className="group relative z-0 mb-5 w-full">
          <select
            id={fieldIds.shirtSize}
            name={fieldIds.shirtSize}
            defaultValue={user?.shirtSize}
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
            required
          >
            <option value=""></option>
            {Object.values(ShirtSize).map((value) => {
              return (
                <option key={value} value={value}>
                  {ShirtSizeName(value)}
                </option>
              );
            })}
          </select>
          <label
            htmlFor={fieldIds.shirtSize}
            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >
            Talla de playera *
          </label>
        </div>
        <div className="group relative z-0 mb-5 w-full">
          <select
            id={fieldIds.shirtStyle}
            name={fieldIds.shirtStyle}
            defaultValue={user?.shirtStyle}
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
            onChange={(ev) => {
              ev.preventDefault();
              setShirtStyle(ShirtStyleOfString(ev.target.value));
            }}
            required
          >
            <option value=""></option>
            {ShirtStyles.map((value) => {
              return (
                <option key={value} value={value}>
                  {ShirtStyleName(value)}
                </option>
              );
            })}
          </select>
          <label
            htmlFor={fieldIds.shirtStyle}
            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >
            Estilo de playera *
          </label>
        </div>
        {shirtStyle && (
          <div className="group relative z-0 mb-5 max-h-12 w-full">
            <div className="absolute">
              <Image
                className="object-contain object-left hover:scale-110 [&:not(:hover)]:max-h-12  [&:not(:hover)]:max-w-12"
                alt={shirtStyle}
                src={getImageData(shirtStyle)}
              ></Image>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function ContactData({
  user,
  isUpdate = false,
}: {
  user: UserRequestInput | null;
  isUpdate: boolean;
}): JSX.Element {
  const [shirtStyle, setShirtStyle] = useState<ShirtStyle | undefined>(
    user?.shirtStyle,
  );
  return (
    <div>
      <SectionTitle title="Datos de contacto" />
      <div className="grid md:grid-cols-2 md:gap-6">
        <FloatingInput
          type="text"
          label="Nombre(s) *"
          defaultValue={user?.firstName}
          id={fieldIds.firstName}
          required
        />
        <FloatingInput
          type="text"
          label="Apellido(s) *"
          defaultValue={user?.lastName}
          id={fieldIds.lastName}
          required
        />
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
        <FloatingInput
          type="text"
          id={fieldIds.preferredName}
          defaultValue={user?.preferredName}
          label="Nombre preferido"
          placeholder=" "
        />
        <div className="group relative z-0 mb-5 w-full">
          <select
            id={fieldIds.pronouns}
            name={fieldIds.pronouns}
            defaultValue={user?.pronouns}
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
            required
          >
            {Pronouns.map((value) => {
              return (
                <option key={value} value={value}>
                  {PronounName(value)}
                </option>
              );
            })}
          </select>
          <label
            htmlFor={fieldIds.pronouns}
            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >
            Pronombre *
          </label>
        </div>
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
        <FloatingInput
          type="date"
          id={fieldIds.birthDate}
          label="Fecha de nacimiento *"
          defaultValue={user?.birthDate.substring(0, 10)}
          placeholder=" "
          readOnly={isUpdate}
          required
        />
        <FloatingInput
          type="text"
          id={fieldIds.governmentId}
          label="CURP *"
          defaultValue={user?.governmentId}
          placeholder=" "
          readOnly={isUpdate}
          required
        />
      </div>

      {/* Shirt */}
      <div className="grid md:grid-cols-4 md:gap-6">
        <div className="group relative z-0 mb-5 w-full">
          <select
            id={fieldIds.shirtSize}
            name={fieldIds.shirtSize}
            defaultValue={user?.shirtSize}
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
            required
          >
            <option value=""></option>
            {Object.values(ShirtSize).map((value) => {
              return (
                <option key={value} value={value}>
                  {ShirtSizeName(value)}
                </option>
              );
            })}
          </select>
          <label
            htmlFor={fieldIds.shirtSize}
            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >
            Talla de playera *
          </label>
        </div>
        <div className="group relative z-0 mb-5 w-full">
          <select
            id={fieldIds.shirtStyle}
            name={fieldIds.shirtStyle}
            defaultValue={user?.shirtStyle}
            className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
            onChange={(ev) => {
              ev.preventDefault();
              setShirtStyle(ShirtStyleOfString(ev.target.value));
            }}
            required
          >
            <option value=""></option>
            {ShirtStyles.map((value) => {
              return (
                <option key={value} value={value}>
                  {ShirtStyleName(value)}
                </option>
              );
            })}
          </select>
          <label
            htmlFor={fieldIds.shirtStyle}
            className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
          >
            Estilo de playera *
          </label>
        </div>
        {shirtStyle && (
          <div className="group relative z-0 mb-5 max-h-12 w-full">
            <div className="absolute">
              <Image
                className="object-contain object-left hover:scale-110 [&:not(:hover)]:max-h-12  [&:not(:hover)]:max-w-12"
                alt={shirtStyle}
                src={getImageData(shirtStyle)}
              ></Image>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
