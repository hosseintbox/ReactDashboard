import { useState } from "react";
import { Formik } from "formik";
import MultiDatePicker from "../../components/tools/datepicker/MultiDatePicker";
import TextArea from "../form/input/TextArea";
import ImageUploader from "../tools/fileUpload/ImageUploader";
import { HttpMethod } from "../../models/enums/HttpMethod";
import { useReactMutation , useReactQuery } from "../../hooks/query/useReactQuery";
import { CreateRequest  ,TransportableItem ,GetCountries ,GetCities} from "../../setting/ApiUrl";
import TextField from "../tools/textField/TextField";
import * as Yup from "yup";
import AutoComplete from "../tools/autoComplete/AutoComplete";
// import Button from "../ui/button/Button";
// import Label from "../form/Label";

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
  const [selectedDestinationCountry, setSelectedDestinationCountry] = useState<Number>();
  const [originAvailable,setOriginAvailable]= useState<any[]>([]);
  const [destinationAvailable,setDestinationAvailable]=useState<any[]>([]);
  const [selectedOriginCountry, setSelectedOriginCountry] = useState<Number>();
  const [formFiles, setFormFiles] = useState<{ [key: string]: FileList }>({});
  const apiDetails = {
    url:CreateRequest,
    method: HttpMethod.POST,
  };
  const {data:countryData } =useReactQuery({
    url:GetCountries,
    method: HttpMethod.GET,
    body: {}, 
  });

  console.log('selectedOriginCountry' ,selectedOriginCountry)
  const { data, isLoading, isError, error:itemError, refetch } = useReactQuery({
    url:TransportableItem,
    method: HttpMethod.GET,
    body: {},
  });

  console.log('data',data?.data?.objectResult?.listItems
)
  const handleFileChange = (name: string, files: FileList) => {
    setFormFiles((prev) => ({ ...prev, [name]: files }));
  };
const { mutate, isPending, isSuccess, error } = useReactMutation(
    apiDetails,
    (res) => {
      console.log("✅ موفق بود:", res);
    },
    (err) => {
      console.log("❌ خطا:", err);
    }
  );

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
 mutate(formData);
  console.log("FormData آماده ارسال است", formData);
};

const ItemList =data?.data?.objectResult?.listItems.map((item:any)=>(
  {
    value:item.value,
    label:item.label
  }));
const countryList =countryData?.data?.objectResult?.listItems.map((item:any)=>(
{
    value:item.value,
    label:item.label
}));
const { data: cityData } = useReactQuery({
  url: GetCities,
  method: HttpMethod.POST,
  body: {
    model: {
      id: selectedOriginCountry,
    },
  },
  enabled: !!selectedOriginCountry,
});
const { data: mainDestinationCityData } = useReactQuery({
  url: GetCities,
  method: HttpMethod.POST,
  body: {
    model: {
      id: selectedDestinationCountry,
    },
  },
  enabled: !!selectedDestinationCountry,
});

const destinationCityList =mainDestinationCityData?.data?.objectResult?.listItems?.map((item:any)=>(
  {value:item.value,
    label:item.label
  }
))
const cityList =cityData?.data?.objectResult?.listItems?.map((item:any)=>(
  {value:item.value,
    label:item.label
  }
));
const handleAddToList = (values: any, setFieldValue: any) => {
  console.log('values',values)
  const newItem = {
    cityId:Number(values.mainDestinationCityId),
   destinationDescription: values.destinationDescription
  };

  setDestinationAvailable((prev) => [...prev, newItem]);

  // Clear specific fields
  setFieldValue("mainDestinationCityId", null);
  setFieldValue("destinationDescription", "");
};
  const handleRemove =(idToRemove:string)=>{
   setDestinationAvailable((prev) =>
     prev.filter((item) => item.cityId !== idToRemove)
   );
  }

const handleAddToOriginList =(values: any ,setFieldValue:any) =>{
  console.log('originvalues' ,values)
  const newItem ={
    cityId :Number(values.mainOriginCityId),
    originDescription: values.originDescription
  }
  setOriginAvailable((prev) => [...prev, newItem]);
  setFieldValue("mainOriginCityId", null);
  setFieldValue("originDescription", "");
}

console.log('originAvailable',originAvailable)
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
  <div className="w-full flex flex-col md:flex-row gap-4">
    <div className="w-full md:w-1/2 bg-gray-100  p-6 rounded-[16px]   border border-gray-300 shadow-initial">
      <div className="flex flex-col md:flex-row gap-4">
        <AutoComplete
          inputClassName="rounded-lg border border-gray-300 text-right"
          className="rounded-lg w-full"
          name="phonePrefix1"
          options={countryList}
          onChange={(values :any)=>setSelectedOriginCountry(Number(values.value))}
          placeholder="کشور مبدا"
          label="کشور مبدا"
        />
        <AutoComplete
          inputClassName="rounded-lg border border-gray-300 text-right"
          className="rounded-lg w-full"
          name="phonePrefix2"
          options={cityList}
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
          onChange={(values :any)=>setSelectedDestinationCountry(Number(values.value))}
          placeholder="کشور مقصد"
          label="کشور مقصد"
        />
        <AutoComplete
          inputClassName="rounded-lg border border-gray-300 text-right"
          className="rounded-lg w-full"
          name="destinationCity"
          options={destinationCityList}
          placeholder="شهر مقصد"
          label="شهر مقصد"
        />
      </div>

      <div className=" md:flex-row border rounded-[16px] p-2 mt-2 items-center">
          <span> اطلاعات مبدا شما</span>
        <div className=" flex flex-row gap-2">
       
          <AutoComplete
          inputClassName="rounded-lg border border-gray-300 text-right"
          className="rounded-lg w-full"
          name="mainOriginCityId"
          options={cityList}
          placeholder="پرواز از"
        />


        <TextField
          innerClassName="rounded-lg mt-[7px] border border-gray-300 text-right"
         className="rounded-lg w-full"
          placeholder="توضیحات"
          name="originDescription"
  
        />
      <button 
        onClick={()=>handleAddToOriginList(values,setFieldValue)}
        className="bg-white border rounded-[13px] w-10 h-10 flex items-center justify-center flex-shrink-0 mt-[7px]">
        +
      </button>
        </div>
  <div className="mt-4 space-y-2">
    {originAvailable.map((item: any, index: number) => (
      <div
        key={index}
        className="flex justify-between items-center px-2 py-1 border rounded"
      >
<div className="flex justify-between items-center w-full gap-2">
  <span className="font-semibold text-[#6B7280]">
    {
      cityList?.find((city:any) => city.value === item.cityId)?.label || item.cityId
    } :
  </span>
  <span className="font-semibold">{item.originDescription}</span>
</div>


        <button
          type="button"
          onClick={() => handleRemove(item.cityId)}
          className="text-gray-400 hover:text-gray-700 font-bold px-2"
        >
          ×
        </button>
      </div>
    ))}
  </div>
      </div>
<div className="md:flex-row border rounded-[16px] p-2 mt-2">
  <span>اطلاعات مقصد شما</span>
  <div className="flex flex-row gap-2">
    <AutoComplete
      inputClassName="rounded-lg border border-gray-300 text-right"
      className="rounded-lg w-full"
      name="mainDestinationCityId"
      options={destinationCityList}
      placeholder="پرواز به"
    />
    <TextField
      innerClassName="rounded-lg mt-[7px] border border-gray-300 text-right"
      className="rounded-lg w-full"
      placeholder="توضیحات"
      name="destinationDescription"
    />
    <button
      onClick={() => handleAddToList(values, setFieldValue)}
      className="bg-white border rounded-[13px] w-10 h-10 flex items-center justify-center flex-shrink-0 mt-[7px]"
    >
      +
    </button>
  </div>

  {/* اینجا رندر رکوردها زیر فرم میاد */}
  <div className="mt-4 space-y-2">
    {destinationAvailable.map((item: any, index: number) => (
      <div
        key={index}
        className="flex justify-between items-center px-2 py-1 border rounded"
      >
        <div className="flex justify-between items-center w-full gap-2">
          <span className="font-semibold text-[#6B7280]">{item.cityId} :</span>
          <span className="font-semibold">{item.destinationDescription}</span>
        </div>

        <button
          type="button"
          onClick={() => handleRemove(item.cityId)}
          className="text-gray-400 hover:text-gray-700 font-bold px-2"
        >
          ×
        </button>
      </div>
    ))}
  </div>
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
