import React from 'react'
import { Formik, Form, Field } from 'formik';
import TextField from '../../../../components/tools/textField/TextField';
import MultiDatePicker from "../../../../components/tools/datepicker/MultiDatePicker";
import AutoComplete from '../../../../components/tools/autoComplete/AutoComplete';
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
function FilterForm({ onSubmit }: { onSubmit: (values: any) => void }) {
  return (
    <div className="p-4 border-2 rounded-[16px]  bg-gray-100 w-full mt-4 border-gray-300 border-solid">
      <Formik
        initialValues={{ name: '', category: '',      toDate:"",
      fromDate:"", }}
        onSubmit={(values) => {
          onSubmit(values)
        }}
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
          <Form className="space-y-4 ">
            <div className='grid grid-cols-4 gap-3'>

                <AutoComplete
          inputClassName="rounded-lg border border-gray-300 text-right"
          className="rounded-lg w-full"
          name="requestType"
          options={RequestType}
          placeholder="نوع درخواست"
          label="نوع درخواست"
        />
  <AutoComplete
          inputClassName="rounded-lg border border-gray-300 text-right"
          className="rounded-lg w-full"
          name="itemCategory"
          options={ItemList}
          placeholder="دسته بندی بسته"
          label="دسته بندی بسته را انتخاب کنید"
        />

 <AutoComplete
          inputClassName="rounded-lg border border-gray-300 text-right"
          className="rounded-lg w-full"
          name="phonePrefix2"
          options={countryList}
          placeholder="شهر مبدا"
          label="شهر مبدا"
        />
         <AutoComplete
          inputClassName="rounded-lg border border-gray-300 text-right"
          className="rounded-lg w-full"
          name="destinationCity"
          options={countryList}
          placeholder="شهر مقصد"
          label="شهر مقصد"
        />
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


           <button
  type="submit"
  className="bg-black text-white text-lg py-2 px-8 rounded-[16px] hover:bg-gray-800"
>
  تایید
</button>

          </Form>
        )}
      </Formik>
    </div>
  )
}

export default FilterForm
