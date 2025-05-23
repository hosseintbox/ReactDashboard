import { useState } from "react";
import { Formik } from "formik";
import MultiDatePicker from "../../components/tools/datepicker/MultiDatePicker";
import TextArea from "../form/input/TextArea";
import ImageUploader from "../tools/fileUpload/ImageUploader";
import TextField from "../tools/textField/TextField";
import * as Yup from "yup";
import AutoComplete from "../tools/autoComplete/AutoComplete";
import Button from "../ui/button/Button";

const countryList = [
  {
    value:1,
    label:'آلمان'
  },
   {
    value:1,
    label:'کانادا'
  }, {
    value:1,
    label:'انگلیس'
  }
]
const ItemList = [
  {
    value:1,
    label:'پت'
  },
   {
    value:1,
    label:'مدارک'
  }, {
    value:1,
    label:'خوراک'
  }
]
const RequestType =[
   {
    value:1,
    label:'حمل کننده'
  },
   {
    value:2,
    label:'ارسال کننده'
  }
]
const NewRequsetForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formFiles, setFormFiles] = useState<{ [key: string]: FileList }>({});

  const handleFileChange = (name: string, files: FileList) => {
    setFormFiles((prev) => ({ ...prev, [name]: files }));
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("ایمیل نامعتبر است").required("ایمیل الزامی است"),
    password: Yup.string().min(6, "حداقل ۶ کاراکتر").required("رمز عبور الزامی است"),
    terms: Yup.boolean().oneOf([true], "پذیرش قوانین الزامی است"),
  });
const handleSubmit = (values: any) => {
  const formData = new FormData();

  Object.entries(values).forEach(([key, value]) => {
    formData.append(key, value as string);
  });


  Object.entries(formFiles).forEach(([key, files]) => {
    for (let i = 0; i < files.length; i++) {
      formData.append(key, files[i]);
    }
  });

  console.log("FormData آماده ارسال است", formData);
};


return (
  <Formik
    initialValues={{
      toDate:"",
      fromDate:"",
      displayName: "",
      phoneNumber: "",
      phonePrefix: "",
      email: "",
      password: "",
      inviteCode: "",
      terms: false,
    }}
    onSubmit={handleSubmit}
  >
    {({
      values,
      handleChange,
      handleBlur,
      handleSubmit,
      touched,
      errors,
      setFieldValue,
    }) => (
<form
  onSubmit={handleSubmit}
  className="w-full min-h-[70vh] flex flex-col items-stretch justify-center gap-4"
>
  {/* دو ستون کنار هم */}
  <div className="w-full flex flex-col md:flex-row gap-4">
    {/* ستون اول: اطلاعات مبدا/مقصد و درخواست */}
    <div className="w-full md:w-1/2 bg-gray-100  p-6 rounded-[16px]   border border-gray-300 shadow-initial">
      <div className="flex flex-col md:flex-row gap-4">
        <AutoComplete
          inputClassName="rounded-lg border border-gray-300 text-right"
          className="rounded-lg w-full"
          name="phonePrefix1"
          options={countryList}
          placeholder="کشور مبدا"
          label="کشور مبدا"
        />
        <AutoComplete
          inputClassName="rounded-lg border border-gray-300 text-right"
          className="rounded-lg w-full"
          name="phonePrefix2"
          options={countryList}
          placeholder="شهر مبدا"
          label="شهر مبدا"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-2">
        <AutoComplete
          inputClassName="rounded-lg border border-gray-300 text-right"
          className="rounded-lg w-full"
          name="destinationCountry"
          options={countryList}
          placeholder="کشور مقصد"
          label="کشور مقصد"
        />
        <AutoComplete
          inputClassName="rounded-lg border border-gray-300 text-right"
          className="rounded-lg w-full"
          name="destinationCity"
          options={countryList}
          placeholder="شهر مقصد"
          label="شهر مقصد"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-2">
        <AutoComplete
          inputClassName="rounded-lg border border-gray-300 text-right"
          className="rounded-lg w-full"
          name="mainOriginCityId"
          options={countryList}
          placeholder="پرواز از"
          label="مبدا پرواز"
        />
        <AutoComplete
          inputClassName="rounded-lg border border-gray-300 text-right"
          className="rounded-lg w-full"
          name="mainDestinationCityId"
          options={countryList}
          placeholder="مقصد پرواز"
          label="مقصد پرواز را انتخاب کنید"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-2">
        <MultiDatePicker
          placeholder="زمان حرکت از مبدا"
          label="حرکت از مبدا"
          name="fromDate"
          value={values.fromDate}
          setFieldValue={setFieldValue}
        />
        <MultiDatePicker
          placeholder="زمان رسیدن به مقصد"
          label="رسیدن به مقصد"
          name="toDate"
          value={values.toDate}
          setFieldValue={setFieldValue}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-2">
        <AutoComplete
          inputClassName="rounded-lg border border-gray-300 text-right"
          className="rounded-lg w-full"
          name="requestType"
          options={RequestType}
          placeholder="نوع درخواست"
          label="نوع درخواست"
        />
        <TextField
          name="priceOffer"
          innerClassName="rounded-lg border border-gray-300 text-right"
          className="rounded-lg text-right"
          label="مبلغ پیشنهادی"
          placeholder="هزینه پیشنهادی خود را وارد کنید"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-2">
        <AutoComplete
          inputClassName="rounded-lg border border-gray-300 text-right"
          className="rounded-lg w-full"
          name="itemCategory"
          options={ItemList}
          placeholder="دسته بندی بسته"
          label="دسته بندی بسته را انتخاب کنید"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-2">
        <TextArea
          innerClassName="bg-white rounded-[13px] border border-gray-300 mt-2"
          className="rounded-[13px]"
          placeholder="آدرس"
          name="address"
          label="توضیحات"
        />
      </div>
    </div>

    {/* ستون دوم: آپلود تصاویر و اطلاعات بار */}
    <div className="w-full md:w-1/2 bg-gray-100   border border-gray-300  p-6 rounded-[16px] shadow-initial space-y-4">
      <div>
        <ImageUploader name="file1" label="آپلود تصویر بلیط" onChange={handleFileChange} />
        <ImageUploader name="file2" label="آپلود تصویر بار" onChange={handleFileChange} />
      </div>

      <p className="font-semibold">اطلاعات بار</p>

      <div className="bg-white rounded-[16px] p-3 mt-3 space-y-2">
        {/* ردیف ۱ */}
        <div className="flex w-full gap-4 mt-2">
          <div className="w-1/2">
            <TextField
              name="maxWeight"
              innerClassName="rounded-lg border border-gray-300 text-right mt-2"
              className="rounded-lg text-right"
              label="حداکثر وزن (kg)"
              placeholder="حداکثر وزن را به کیلوگرم وارد کنید"
            />
          </div>
          <div className="w-1/2">
            <TextField
              name="maxLength"
              innerClassName="rounded-lg border border-gray-300 text-right mt-2"
              className="rounded-lg text-right"
              label="حداکثر طول (cm)"
              placeholder="حداکثر طول را وارد کنید"
            />
          </div>
        </div>

        {/* ردیف ۲ */}
        <div className="flex w-full gap-4 mt-2">
          <div className="w-1/2">
            <TextField
              name="maxWidth"
              innerClassName="rounded-lg border border-gray-300 text-right mt-2"
              className="rounded-lg text-right"
              label="حداکثر عرض (cm)"
              placeholder="حداکثر عرض را وارد کنید"
            />
          </div>
          <div className="w-1/2">
            <TextField
              name="maxHeight"
              innerClassName="rounded-lg border border-gray-300 text-right mt-2"
              className="rounded-lg text-right"
              label="حداکثر ارتفاع (cm)"
              placeholder="حداکثر ارتفاع را وارد کنید"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* دکمه ارسال زیر دو ستون */}
  <div className="flex  w-full mt-2">
    <button
      type="submit"
      className="bg-black text-white px-8 py-3 rounded-lg"
    >
      ارسال فرم
    </button>
  </div>
</form>

    )}
  </Formik>
);

};

export default NewRequsetForm;
